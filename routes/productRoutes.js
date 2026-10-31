const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// C - Create
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// R - Read All
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// U - Update
router.put('/:pid', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { pid: req.params.pid }, req.body, { new: true }
        );
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// D - Delete
router.delete('/:pid', async (req, res) => {
    try {
        await Product.findOneAndDelete({ pid: req.params.pid });
        res.json({ message: "Đã xóa sản phẩm" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;