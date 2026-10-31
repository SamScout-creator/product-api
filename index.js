require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./productModel');

const app = express();
app.use(express.json());

// Kết nối đến MongoDB trong Docker
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Đã kết nối tới MongoDB"))
  .catch(err => console.error("Lỗi kết nối MongoDB:", err));

// C - Create (Tạo sản phẩm)
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// R - Read All (Lấy tất cả sản phẩm)
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// U - Update (Cập nhật)
app.put('/products/:pid', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { pid: req.params.pid },
            req.body,
            { new: true }
        );
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// D - Delete (Xóa)
app.delete('/products/:pid', async (req, res) => {
    try {
        await Product.findOneAndDelete({ pid: req.params.pid });
        res.json({ message: "Đã xóa sản phẩm" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Healthcheck cho Bước 9
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    if (dbStatus === 'connected') {
        res.status(200).json({ status: 'OK', database: dbStatus });
    } else {
        res.status(500).json({ status: 'ERROR', database: dbStatus });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});