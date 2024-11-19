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




export default router;
