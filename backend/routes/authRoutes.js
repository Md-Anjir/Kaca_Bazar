import express from 'express'
import {connectToDatabase} from '../lib/db.js'
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
const app = express();
const router = express.Router()



router.post('/register', async (req, res) => {
    const {name, email, password, phone_number, address} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM buyer WHERE Email = ?', [email])
        if(rows.length > 0) {
            return res.status(408).json({message : "User already existed"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO buyer (Buyer_Name, Email, Password, Phone_Number, Address) VALUES (?, ?, ?, ?, ?)", 
            [name, email, hashPassword, phone_number, address])
        
        return res.status(201).json({message: "user created successfully"})
    } catch(err) {
        return res.status(500).json(err.message)
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM buyer WHERE Email = ?', [email])
        if(rows.length == 0) {
            return res.status(408).json({message : "user not existed"})
        }
        const isMatch = await bcrypt.compare(password, rows[0].Password)
        if(!isMatch){
            return res.status(401).json({message : "Wrong password"})
        }
        return res.status(200).json({ message: 'Login successful' });
        // const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})
        // return res.status(201).json({token: token})
        
    } catch(err) {
        return res.status(500).json(err.message)
    }
})


router.post('/sellerregister', async (req, res) => {
    const {name, email, password, phone_number, location} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM seller WHERE Email = ?', [email])
        if(rows.length > 0) {
            return res.status(408).json({message : "User already existed"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO seller (Seller_Name, Email, Password, Phone_Number, Location_ID) VALUES (?, ?, ?, ?, ?)", 
            [name, email, hashPassword, phone_number, location])
        
        return res.status(201).json({message: "user created successfully"})
    } catch(err) {
        return res.status(500).json(err.message)
    }
})

router.post('/sellerlogin', async (req, res) => {
    const {email, password} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM seller WHERE Email = ?', [email])
        if(rows.length == 0) {
            return res.status(408).json({message : "user not existed"})
        }
        const isMatch = await bcrypt.compare(password, rows[0].Password)
        if(!isMatch){
            return res.status(401).json({message : "Wrong password"})
        }
        return res.status(200).json({ message: 'Login successful' });
        // const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})
        // return res.status(201).json({token: token})
        
    } catch(err) {
        return res.status(500).json(err.message)
    }
})

router.post('/farmerregister', async (req, res) => {
    const {name, email, password, phone_number, location, address} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM farmer WHERE Email = ?', [email])
        if(rows.length > 0) {
            return res.status(408).json({message : "User already existed"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO farmer (Farmer_Name, Email, Password, Phone_Number, Location_ID, Address) VALUES (?, ?, ?, ?, ?, ?)", 
            [name, email, hashPassword, phone_number, location, address])
        
        return res.status(201).json({message: "user created successfully"})
    } catch(err) {
        return res.status(500).json(err.message)
    }
})

router.post('/farmerlogin', async (req, res) => {
    const {email, password} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM farmer WHERE Email = ?', [email])
        if(rows.length == 0) {
            return res.status(408).json({message : "user not existed"})
        }
        const isMatch = await bcrypt.compare(password, rows[0].Password)
        if(!isMatch){
            return res.status(401).json({message : "Wrong password"})
        }
        return res.status(200).json({ message: 'Login successful' });
        // const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})
        // return res.status(201).json({token: token})
        
    } catch(err) {
        return res.status(500).json(err.message)
    }
})

export default router;