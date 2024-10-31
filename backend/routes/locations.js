import express from 'express'
import {connectToDatabase} from '../lib/db.js'
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const sql = "SELECT Location_ID, Location_Name FROM location"; // Adjust your SQL query based on your table structure
        const [results] = await db.query(sql); // Using promise-based query
        
        return res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: "Database query failed", message: err.message });
    }
})

export default router;
