import express from "express"
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import locations from './routes/locations.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter) 
app.use('/locations', locations)

app.listen(process.env.PORT, ()=>{
    console.log("Server is running")
})

app.get('/', (req, res) => {
    res.send('Hello, Server');
});