import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // <--- CHECK KARO: YE HAI?

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // <--- CHECK KARO: YE HAI?

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));