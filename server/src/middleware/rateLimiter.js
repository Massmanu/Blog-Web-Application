const rateLimit = require('express-rate-limit');

// General Rate Limiter: 100 requests per 15 minutes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1, // Limit each IP to 100 requests per window
    message: {
        msg: "⏳ Too many requests from this IP, please try again after 15 minutes."
    },
    standardHeaders: true, // Return rate limit info in the headers
    legacyHeaders: false,  // Disable deprecated headers
});

module.exports = apiLimiter;
