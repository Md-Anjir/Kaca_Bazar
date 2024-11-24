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


const authenticateBuyer = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, "anjir3734", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.buyerId = decoded.Buyer_ID; // Fixing the variable name to buyerId
    next();
  });
};


router.get("/product-ads", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    // console.log("Connected to database"); // Add this line
    const [rows] = await connection.query(
      `   SELECT 
          spa.Seller_Product_Ad_ID,
          spa.Seller_ID, 
          spa.Stock, 
          spa.Unit_Name, 
          spa.Unit_Price, 
          spa.Description, 
          pl.Product_Name,
          s.Seller_Name
        FROM seller_product_ads spa
        JOIN product_list pl ON spa.Product_ID = pl.Product_ID
        JOIN seller s ON spa.Seller_ID = s.Seller_ID `
    );

    // console.log("Fetched rows:", rows); // Add this line
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving seller product ads:', error);
    res.status(500).json({ message: 'Error retrieving seller product ads' });
  }
});

router.get('/seller-product-ads', async (req, res) => {
  const category = req.query.category;
  console.log("Category received is:", category);

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(
      `
        SELECT 
          spa.Seller_Product_Ad_ID,
          spa.Seller_ID, 
          spa.Stock, 
          spa.Unit_Name, 
          spa.Unit_Price, 
          spa.Description, 
          pl.Product_Name,
          s.Seller_Name
        FROM seller_product_ads spa
        JOIN product_list pl ON spa.Product_ID = pl.Product_ID
        JOIN seller s ON spa.Seller_ID = s.Seller_ID
        WHERE pl.Category = ?
      `,
      [category]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error retrieving seller product ads:', error);
    res.status(500).json({ message: 'Error retrieving seller product ads' });
  }
});

router.get("/seller-products/:sellerId", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const { sellerId } = req.params;

    const [rows] = await connection.query(
      "SELECT spa.Seller_Product_Ad_ID,spa.Seller_ID, spa.Stock, spa.Unit_Name, spa.Unit_Price, spa.Description, pl.Product_Name,s.Seller_Name FROM seller_product_ads spa JOIN product_list pl ON spa.Product_ID = pl.Product_ID JOIN seller s ON spa.Seller_ID = s.Seller_ID WHERE spa.Seller_ID = ?",
      [sellerId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: `No products found for seller ID: ${sellerId}` });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Endpoint to search for product ads by product name or description
router.get("/search", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const connection = await connectToDatabase();
    const [results] = await connection.query(
      `
      SELECT 
        spa.Seller_Product_Ad_ID,
        spa.Seller_ID, 
        spa.Stock, 
        spa.Unit_Name, 
        spa.Unit_Price, 
        spa.Description, 
        pl.Product_Name,
        pl.Product_ID,
        s.Seller_Name
      FROM seller_product_ads spa
      JOIN product_list pl ON spa.Product_ID = pl.Product_ID
      JOIN seller s ON spa.Seller_ID = s.Seller_ID
      WHERE pl.Product_Name LIKE ? OR spa.Description LIKE ?
      GROUP BY pl.Product_ID
      `,
      [`%${query}%`, `%${query}%`]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "No products found matching the search criteria" });
    }

    res.json(results);
  } catch (error) {
    console.error("Error searching for product ads:", error);
    res.status(500).json({ error: "Error searching for product ads" });
  }
});




router.get("/search-products/:productId", async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const { productId } = req.params;  // Get productId from the URL parameters

    // Query to fetch products based on the productId
    const [rows] = await connection.query(
      `SELECT 
        spa.Seller_Product_Ad_ID,
        spa.Seller_ID, 
        spa.Stock, 
        spa.Unit_Name, 
        spa.Unit_Price, 
        spa.Description, 
        pl.Product_Name, 
        pl.Product_ID,
        s.Seller_Name 
      FROM seller_product_ads spa
      JOIN product_list pl ON spa.Product_ID = pl.Product_ID
      JOIN seller s ON spa.Seller_ID = s.Seller_ID
      WHERE pl.Product_ID = ?`,  // Filter by productId
      [productId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: `No products found for product ID: ${productId}` });
    }

    res.json(rows);  // Return the fetched rows (product ads)
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Endpoint to get all orders for a buyer
router.get('/orders', authenticateBuyer, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const buyerId = req.buyerId; // Retrieved from token in `authenticateBuyer`

    const sql = `
      SELECT o.Order_ID, pl.Product_Name, o.Quantity, o.Price, o.Order_Confirmed_Time, o.Shipped_Time, o.Delivered_Time, o.Payment_Time
      FROM \`order\` o
      JOIN \`seller_product_ads\` spa ON o.Seller_Product_AD_ID = spa.Seller_Product_AD_ID
      JOIN \`product_list\` pl ON spa.Product_ID = pl.Product_ID
      WHERE o.Buyer_ID = ?
      ORDER BY o.Shipped_Time IS NULL DESC, o.Order_Confirmed_Time IS NULL DESC, o.Order_Confirmed_Time, o.Shipped_Time
    `;

    const [results] = await db.query(sql, [buyerId]);

    res.json(results);
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    res.status(500).json({ error: 'Error fetching buyer orders' });
  }
});

// Endpoint to process payment for an order
router.patch('/orders/pay/:orderId', authenticateBuyer, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const orderId = req.params.orderId;
    const buyerId = req.buyerId; // Retrieved from token in `authenticateBuyer`

    const sql = `
      UPDATE \`order\`
      SET Payment_Time = NOW()
      WHERE Order_ID = ? AND Buyer_ID = ?
    `;

    const [result] = await db.query(sql, [orderId, buyerId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found or not authorized to pay" });
    }

    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Error processing payment' });
  }
});


export default router;
