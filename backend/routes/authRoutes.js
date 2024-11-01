import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';


const app = express();
const router = express.Router();

const JWT_SECRET = 'anjir3734';

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.json());


router.post('/register', async (req, res) => {
    const { name, email, password, phone_number, address } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM buyer WHERE Email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" }); // Changed to 409 Conflict
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO buyer (Buyer_Name, Email, Password, Phone_Number, Address) VALUES (?, ?, ?, ?, ?)", 
            [name, email, hashPassword, phone_number, address]);
        
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM buyer WHERE Email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, rows[0].Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const buyertoken = jwt.sign({ Buyer_ID: rows[0].Buyer_ID }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: 'Login successful', buyertoken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


router.get('/buyerinfo', async (req, res) => {
    const buyertoken = req.headers['authorization']?.split(' ')[1]; // Get the buyertoken from Authorization header
    if (!buyertoken) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(buyertoken, JWT_SECRET); // Verify the buyertoken
        const Buyer_ID = decoded.Buyer_ID;

        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT Buyer_Name, Email, Phone_Number, Address FROM buyer WHERE Buyer_ID = ?', [Buyer_ID]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Buyer not found' });
        }

        return res.status(200).json(rows[0]); // Send buyer information
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


// Seller registration and login
router.post('/sellerregister', async (req, res) => {
    const { name, email, password, phone_number, location } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM seller WHERE Email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" }); // Changed to 409 Conflict
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO seller (Seller_Name, Email, Password, Phone_Number, Location_ID) VALUES (?, ?, ?, ?, ?)", 
            [name, email, hashPassword, phone_number, location]);
        
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: err.message });
    }
});

router.post('/sellerlogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM seller WHERE Email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, rows[0].Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const sellertoken = jwt.sign({ Seller_ID: rows[0].Seller_ID }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: 'Login successful', sellertoken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// Seller info route
router.get('/sellerinfo', async (req, res) => {
    const sellertoken = req.headers['authorization']?.split(' ')[1];
    if (!sellertoken) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(sellertoken, JWT_SECRET);
        const Seller_ID = decoded.Seller_ID;

        const db = await connectToDatabase();
        const [rows] = await db.query(`
            SELECT s.Seller_Name, s.Email, s.Phone_Number, l.Location_Name
            FROM seller s
            JOIN location l ON s.Location_ID = l.Location_ID
            WHERE s.Seller_ID = ?
        `, [Seller_ID]);
        

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        return res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// Farmer registration and login
router.post('/farmerregister', async (req, res) => {
    const { name, email, password, phone_number, location, address } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM farmer WHERE Email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" }); // Changed to 409 Conflict
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO farmer (Farmer_Name, Email, Password, Phone_Number, Location_ID, Address) VALUES (?, ?, ?, ?, ?, ?)", 
            [name, email, hashPassword, phone_number, location, address]);
        
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: err.message });
    }
});

// Farmer login
router.post('/farmerlogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM farmer WHERE Email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, rows[0].Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT farmertoken
        const farmertoken = jwt.sign({ Farmer_ID: rows[0].Farmer_ID }, JWT_SECRET, { expiresIn: '1d' });
        
        return res.status(200).json({ message: 'Login successful', farmertoken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


// Farmer info route
router.get('/farmerinfo', async (req, res) => {
    const farmertoken = req.headers['authorization']?.split(' ')[1]; // Get farmertoken from Authorization header
    if (!farmertoken) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(farmertoken, JWT_SECRET); // Verify farmertoken
        const Farmer_ID = decoded.Farmer_ID;

        const db = await connectToDatabase();
        const [rows] = await db.query(`
            SELECT f.Farmer_Name, f.Email, f.Phone_Number, l.Location_Name, f.Address
            FROM farmer f
            JOIN location l ON f.Location_ID = l.Location_ID
            WHERE f.Farmer_ID = ?
        `, [Farmer_ID]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Farmer not found' });
        }

        return res.status(200).json(rows[0]); // Return farmer information
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


export default router;
