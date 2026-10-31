require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

// Kết nối MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/productdb';
mongoose.connect(mongoURI)
  .then(() => console.log("Đã kết nối tới MongoDB"))
  .catch(err => console.error("Lỗi kết nối:", err));

app.use('/products', productRoutes);

// Healthcheck
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    if (dbStatus === 'connected') {
        res.status(200).json({ status: 'OK', database: dbStatus });
    } else {
        res.status(500).json({ status: 'ERROR', database: dbStatus });
    }
});

module.exports = app;