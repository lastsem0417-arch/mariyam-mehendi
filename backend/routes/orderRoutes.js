import express from 'express';
import Order from '../models/orderModel.js';

const router = express.Router();

// 1. Naya order save karne ke liye
router.post('/create', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, message: "Order Saved in Database" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Saare orders admin ko dikhane ke liye
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;