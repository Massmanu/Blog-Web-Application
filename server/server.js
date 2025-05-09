// server.js
const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

const apiLimiter = require('./src/middleware/rateLimiter');



const app = express();
app.use(express.json()); // for parsing JSON bodies
app.use(cors({

    credentials: true
}));

const connectDB = require('./src/config/db');

dotenv.config();
connectDB();



// Apply rate limiter to all routes
app.use('/api', apiLimiter);
// Use main router from src/routes/index.js
app.use('/api', require('./src/routes/index'));


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
