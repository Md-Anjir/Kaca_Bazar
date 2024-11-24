import express from "express";
import { connectToDatabase } from "../lib/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";

const router = express.Router();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

// Middleware to authenticate the seller token
const authenticateSeller = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "anjir3734", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.sellerId = decoded.Seller_ID; // assuming your token contains `Seller_ID`
    next();
  });
};

// Route to add a new product ad for a seller
router.post("/product_ad", authenticateSeller, async (req, res) => {
  const db = await connectToDatabase();
  const { Product_ID, Unit_Name, Unit_Price, Description, Stock, Picture_URL } =
    req.body;

  console.log(req.sellerId); // Log the seller ID

  const sql = `
        INSERT INTO seller_product_ads 
        (Seller_ID, Product_ID, Unit_Name, Unit_Price, Stock, Description, Picture_URL, Created_Date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())`;
  const values = [
    req.sellerId,
    Product_ID,
    Unit_Name || "KG",
    Unit_Price,
    Stock,
    Description,
    Picture_URL,
  ];

  try {
    const [result] = await db.query(sql, values);
    return res
      .status(201)
      .json({
        success: true,
        message: "Product Ad Added successfully",
        adId: result.insertId,
      });
  } catch (err) {
    console.error("Database error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Database error", error: err });
  }
});

// Route to get all ads for the authenticated seller
router.get("/ads", authenticateSeller, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const sql = `
            SELECT ads.*, products.Product_Name
            FROM seller_product_ads AS ads
            JOIN product_list AS products ON ads.Product_ID = products.Product_ID
            WHERE ads.Seller_ID = ?
        `;
    const [results] = await db.query(sql, [req.sellerId]);

    return res.status(200).json(results);
  } catch (err) {
    console.error("Database query error:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch ads", message: err.message });
  }
});

// DELETE endpoint to remove a specific ad for a seller
router.delete("/ad/:id", authenticateSeller, async (req, res) => {
  const db = await connectToDatabase();
  const adId = req.params.id;

  const sql =
    "DELETE FROM seller_product_ads WHERE Seller_Product_AD_ID = ? AND Seller_ID = ?";

  try {
    const [result] = await db.query(sql, [adId, req.sellerId]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Ad not found or not authorized to delete" });
    }
    res.status(200).json({ message: "Ad deleted successfully" });
  } catch (err) {
    console.error("Error deleting ad:", err);
    return res.status(500).json({ message: "Error deleting ad" });
  }
});

// Toggle ad status (on/off)
router.patch("/ad/status/:adId", authenticateSeller, async (req, res) => {
  const adId = req.params.adId;
  const { status } = req.body;
  const db = await connectToDatabase();

  const sql = "UPDATE seller_product_ads SET Status = ? WHERE Seller_Product_AD_ID = ?";
  db.query(sql, [status, adId], (err, result) => {
    if (err) {
      console.error("Error updating ad status:", err);
      return res.status(500).json({ error: "Failed to update ad status" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ad not found" });
    }
    res.status(200).json({ message: "Ad status updated successfully" });
  });
});

router.get("/farmer-product-ads", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    // Fetch farmer product ads with relevant details
    const [rows] = await connection.query(
      `SELECT 
           fpa.Farmer_Product_AD_ID,
           fpa.Farmer_ID, 
           fpa.Unit_Name, 
           fpa.Minimum_Order_Quantity, 
           fpa.Unit_Price, 
           fpa.Delivery_Date, 
           fpa.Phone_Number, 
           fpa.Description, 
           fpa.Picture_URL, 
           fpa.Created_Date,
           pl.Product_Name,
           f.Farmer_Name
         FROM farmer_product_ads fpa
         JOIN product_list pl ON fpa.Product_ID = pl.Product_ID
         JOIN farmer f ON fpa.Farmer_ID = f.Farmer_ID
         ORDER BY fpa.Created_Date DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error("Error retrieving farmer product ads:", error);
    res.status(500).json({ message: "Error retrieving farmer product ads" });
  }
});

router.get("/farmer-product-category-ads", async (req, res) => {
  const category = req.query.category;
  console.log("Category received is:", category);

  if (!category) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(
      `
          SELECT 
            fpa.Farmer_Product_AD_ID,
            fpa.Farmer_ID, 
            fpa.Unit_Name, 
            fpa.Minimum_Order_Quantity, 
            fpa.Unit_Price, 
            fpa.Delivery_Date, 
            fpa.Phone_Number, 
            fpa.Description, 
            fpa.Picture_URL, 
            fpa.Created_Date,
            pl.Product_Name,
            f.Farmer_Name
          FROM farmer_product_ads fpa
          JOIN product_list pl ON fpa.Product_ID = pl.Product_ID
          JOIN farmer f ON fpa.Farmer_ID = f.Farmer_ID
          WHERE pl.Category = ?
          ORDER BY fpa.Created_Date DESC
        `,
      [category]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error retrieving farmer product ads by category:", error);
    res
      .status(500)
      .json({ message: "Error retrieving farmer product ads by category" });
  }
});

router.get("/farmer-products/:farmerId", async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const { farmerId } = req.params;

        const [rows] = await connection.query(
            `SELECT fpa.Farmer_Product_Ad_ID, fpa.Farmer_ID, 
                    fpa.Unit_Name, fpa.Unit_Price, fpa.Description,fpa.Minimum_Order_Quantity, fpa.Delivery_Date,
                    pl.Product_Name, f.Farmer_Name, f.Phone_Number 
             FROM farmer_product_ads fpa 
             JOIN product_list pl ON fpa.Product_ID = pl.Product_ID 
             JOIN farmer f ON fpa.Farmer_ID = f.Farmer_ID 
             WHERE fpa.Farmer_ID = ?`,
            [farmerId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: `No products found for farmer ID: ${farmerId}` });
        }

        res.json(rows);
    } catch (error) {
        console.error("Error fetching farmer products:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

// Endpoint to get the count of pending orders
router.get('/orders/pending-count', authenticateSeller, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const sellerId = req.sellerId; // Retrieved from token in `authenticateSeller`

    const [result] = await db.query(
      'SELECT COUNT(*) AS pendingCount FROM `order` WHERE Order_Confirmed_Time IS NULL AND Seller_Product_AD_ID IN (SELECT Seller_Product_AD_ID FROM seller_product_ads WHERE Seller_ID = ?)',
      [sellerId]
    );

    res.json({ count: result[0].pendingCount });
  } catch (error) {
    console.error('Error fetching pending orders count:', error); // Detailed logging
    res.status(500).json({ error: 'Error fetching pending orders count' });
  }
});

// Endpoint to get all orders for a seller, sorted by confirmation, shipment, and delivery status
router.get('/orders', authenticateSeller, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const sellerId = req.sellerId; // Retrieved from token in `authenticateSeller`

    const sql = `
      SELECT o.Order_ID, pl.Product_Name, o.Quantity, o.Price, o.Order_Confirmed_Time, o.Shipped_Time, o.Delivered_Time, o.Payment_Time
      FROM \`order\` o
      JOIN \`seller_product_ads\` spa ON o.Seller_Product_AD_ID = spa.Seller_Product_AD_ID
      JOIN \`product_list\` pl ON spa.Product_ID = pl.Product_ID
      WHERE spa.Seller_ID = ?
      ORDER BY o.Order_Confirmed_Time IS NULL DESC, o.Order_Confirmed_Time, o.Shipped_Time IS NULL DESC, o.Shipped_Time, o.Delivered_Time IS NULL DESC, o.Delivered_Time
    `;

    const [results] = await db.query(sql, [sellerId]);

    res.json(results);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Endpoint to confirm the order
router.patch('/orders/confirm/:orderId', authenticateSeller, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const orderId = req.params.orderId;
    const sellerId = req.sellerId; // Retrieved from token in `authenticateSeller`

    const sql = `
      UPDATE \`order\`
      SET Order_Confirmed_Time = NOW()
      WHERE Order_ID = ? AND Seller_Product_AD_ID IN (SELECT Seller_Product_AD_ID FROM seller_product_ads WHERE Seller_ID = ?)
    `;

    const [result] = await db.query(sql, [orderId, sellerId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found or not authorized to confirm" });
    }

    res.status(200).json({ message: "Order confirmed successfully" });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ error: 'Error confirming order' });
  }
});

// Endpoint to mark the order as shipped
router.patch('/orders/ship/:orderId', authenticateSeller, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const orderId = req.params.orderId;
    const sellerId = req.sellerId; // Retrieved from token in `authenticateSeller`

    const sql = `
      UPDATE \`order\`
      SET Shipped_Time = NOW()
      WHERE Order_ID = ? AND Seller_Product_AD_ID IN (SELECT Seller_Product_AD_ID FROM seller_product_ads WHERE Seller_ID = ?)
    `;

    const [result] = await db.query(sql, [orderId, sellerId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found or not authorized to ship" });
    }

    res.status(200).json({ message: "Order marked as shipped successfully" });
  } catch (error) {
    console.error('Error marking order as shipped:', error);
    res.status(500).json({ error: 'Error marking order as shipped' });
  }
});

export default router;
