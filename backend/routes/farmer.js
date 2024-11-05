import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const router = express.Router();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
}));

// Middleware to authenticate the farmer token
const authenticateFarmer = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, "anjir3734", (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
  
      req.farmerId = decoded.Farmer_ID; // assuming your token contains `Farmer_ID`
      next();
    });
  };
  
  // Route to add a new product ad
  router.post("/product_ad", authenticateFarmer, async (req, res) => {
    const db = await connectToDatabase();
    const {
      Product_ID,
      Unit_Name,
      Minimum_Order_Quantity,
      Unit_Price,
      Delivery_Date,
      Phone_Number,
      Description,
      Picture_URL
    } = req.body;
  
    const sql = `
      INSERT INTO farmer_product_ads 
      (Farmer_ID, Product_ID, Unit_Name, Minimum_Order_Quantity, Unit_Price, Delivery_Date, Phone_Number, Description, Picture_URL, Created_Date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`;
    const values = [
      req.farmerId,
      Product_ID,
      Unit_Name || "KG",
      Minimum_Order_Quantity,
      Unit_Price,
      Delivery_Date,
      Phone_Number,
      Description,
      Picture_URL,
    ];

    // Use a promise-based query instead of the callback style
    try {
        const [result] = await db.query(sql, values);
        return res.status(201).json({ success: true, message: "Product ad added successfully", adId: result.insertId });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Database error", error: err });
    }
});

// router.get("/ads", authenticateFarmer, async(req, res) => {
//     // const db = await connectToDatabase();
//     // const sql = "SELECT * FROM farmer_product_ads WHERE Farmer_ID = ?";
//     // db.query(sql, [req.farmerId], (err, results) => {
//     //   if (err) return res.status(500).json({ error: "Failed to fetch ads." });
//     //   res.json(results);
//     // });
//   });

router.get("/ads", authenticateFarmer, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const sql = "SELECT * FROM farmer_product_ads WHERE Farmer_ID = ?";
        const [results] = await db.query(sql, [req.farmerId]);
        
        return res.status(200).json(results);
    } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Failed to fetch ads", message: err.message });
    }
});
  
// router.delete("/ad/:id", authenticateFarmer, async (req, res) => {
//     const db = await connectToDatabase();
//     const { id } = req.params;

//     const checkSql = "SELECT * FROM farmer_product_ads WHERE Farmer_Product_AD_ID = ? AND Farmer_ID = ?";
//     db.query(checkSql, [id, req.farmerId], (err, result) => {
//         if (err) return res.status(500).json({ success: false, message: "Failed to verify ad ownership" });
//         if (result.length === 0) return res.status(404).json({ success: false, message: "Ad not found or unauthorized" });

//         const deleteSql = "DELETE FROM farmer_product_ads WHERE Farmer_Product_AD_ID = ?";
//         db.query(deleteSql, [id], (err) => {
//             if (err) return res.status(500).json({ success: false, message: "Failed to delete ad" });
//             res.json({ success: true, message: "Ad deleted successfully" });
//         });
//     });
// });
  


// DELETE endpoint to remove a specific ad
router.delete('/ad/:id', authenticateFarmer, async (req, res) => {
  const db = await connectToDatabase();
  const adId = req.params.id;

  const sql = 'DELETE FROM farmer_product_ads WHERE Farmer_Product_AD_ID = ?';

  db.query(sql, [adId], (err, result) => {
    if (err) {
      console.error('Error deleting ad:', err); // Log the error for debugging
      return res.status(500).json({ message: 'Error deleting ad' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.status(200).json({ message: 'Ad deleted successfully' });
  });
});



router.get('/product-ads', async (req, res) => {
    const category = req.query.category;
    console.log("Category received:", category);
  
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
  
    try {
      const connection = await connectToDatabase();
      const [rows] = await connection.query(
        `
          SELECT 
        pa.Product_AD_ID, 
        pa.Stock, 
        pa.Unit_Name, 
        pa.Minimum_Order_Quantity, 
        pa.Unit_Price, 
        pa.Delivery_Date, 
        pa.Description, 
        pl.Product_Name
    FROM product_ad pa
    JOIN product_list pl ON pa.Product_ID = pl.Product_ID
    WHERE pl.Category = ?
        `,
        [category]
      );
  
    //   await connection.release();
      res.json(rows);
      
    } catch (error) {
      console.error('Error retrieving product ads:', error);
      res.status(500).json({ message: 'Error retrieving product ads' });
    }
  });
export default router;