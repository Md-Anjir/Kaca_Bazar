import express from "express";
import { connectToDatabase } from "../lib/db.js"; // Ensure this is the correct path
import cors from 'cors';

const router = express.Router();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
}));

// GET endpoint to retrieve product ads based on category
// router.get("/product-ads", async (req, res) => {
//     const db = await connectToDatabase();
//     const category = req.query.category;
//     console.log("Category received:", category); // Logging to verify category is received
//     // category=category;

//     if (!category) {
//         return res.status(400).json({ message: "Category is required" }); 
//     }

//     const sql = `
//     SELECT 
//         pa.Product_AD_ID, 
//         pa.Stock, 
//         pa.Unit_Name, 
//         pa.Minimum_Order_Quantity, 
//         pa.Unit_Price, 
//         pa.Delivery_Date, 
//         pa.Description, 
//         pl.Product_Name
//     FROM product_ad pa
//     JOIN product_list pl ON pa.Product_ID = pl.Product_ID
//     WHERE pl.Category = category`; // Incorrect usage of 'category' variable


//     db.query(sql, [category], (err, data) => {
//         if (err) {
//             console.error("Error retrieving product ads:", err); // Log the error for debugging
//             return res.status(500).json({ message: "Error retrieving product ads" });
//         }

//         if (data.length === 0) {
//             return res.status(404).json({ message: "No product ads found for this category" });
//         }

//         res.json(data); // Return the retrieved data
//     });
// });

// export default router;



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