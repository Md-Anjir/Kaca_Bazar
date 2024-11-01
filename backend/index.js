import express from "express";
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import locations from './routes/locations.js';

const app = express();
app.use(cors());
app.use(express.json());

// CORS setup
const corsOptions = {
    origin: 'http://localhost:4000', // Specify your frontend origin
    credentials: true, // Allow credentials
  };

  app.use(cors(corsOptions));


// Register routes
app.use('/auth', authRouter);
app.use('/locations', locations);

app.get('/', (req, res) => {
    res.send('Hello, Server');
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", process.env.PORT || 3000);
});
