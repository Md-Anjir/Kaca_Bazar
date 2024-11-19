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



router.get("/ads", authenticateFarmer, async (req, res) => {
  try {
      const db = await connectToDatabase();
      const sql = `
          SELECT ads.*, products.Product_Name
          FROM farmer_product_ads AS ads
          JOIN product_list AS products ON ads.Product_ID = products.Product_ID
          WHERE ads.Farmer_ID = ?
      `;
      const [results] = await db.query(sql, [req.farmerId]);
      
      return res.status(200).json(results);
  } catch (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Failed to fetch ads", message: err.message });
  }
});


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


export default router;