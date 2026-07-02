const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Base Route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Yade-Ilahi (Toheed Ibadat) API",
        status: "Active",
        meta_url: "/api/meta",
        modules_url: "/api/module/:id"
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});