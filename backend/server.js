const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const adminRoutes = require("./routes/admin")
const profileRoutes = require("./routes/profile")

const cors = require("cors")



const app = express();
app.use(cors())

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/panel', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes)
app.use('/profile', profileRoutes)

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
