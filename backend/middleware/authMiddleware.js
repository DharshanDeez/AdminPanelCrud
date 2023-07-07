const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');

    // Check if token exists
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token.substring(7), 'sgyd883ygdyuegig8dy8ieygegfbi'); // Replace with your own secret key

        // Attach the decoded token payload to the request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
