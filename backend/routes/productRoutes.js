import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import Product from '../models/productModel.js';

const router = express.Router();

// --- MULTER SETUP ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- 1. ADMIN: ADD NEW PRODUCT ---
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload karna zaroori hai!" });
    }

    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder: 'mariyam_mehendi_products',
    });

    const newProduct = new Product({
      name,
      price: Number(price),
      category,
      description: description || "Handcrafted with love.", // Fallback agar description khali ho
      image: uploadResponse.secure_url,
      rating: 0,
      numReviews: 0,
      reviews: [] 
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product Added!", product: newProduct });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// --- 2. GET ALL PRODUCTS ---
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- 3. GET SINGLE PRODUCT ---
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product nahi mila' });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid Product ID" });
  }
});

// --- 4. ADD REVIEW ROUTE (Validation Error Fix Wala) ---
router.post('/:id/review', async (req, res) => {
  const { name, rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // FIX 1: Agar reviews array nahi hai, toh banao
      if (!product.reviews) {
        product.reviews = [];
      }

      // FIX 2: (YE HAI TERA ERROR SOLUTION)
      // Agar purane product mein description missing hai, toh dummy daal do
      if (!product.description) {
        product.description = "Premium quality handcrafted product from Mariyam Mehendi.";
      }
      // Agar category missing hai
      if (!product.category) {
        product.category = "General";
      }

      const review = {
        name,
        rating: Number(rating),
        comment,
        date: Date.now()
      };

      product.reviews.push(review);

      // Rating Calculation
      product.numReviews = product.reviews.length;
      if (product.numReviews > 0) {
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
      } else {
        product.rating = 0;
      }

      await product.save(); // Ab ye error nahi dega kyunki humne description bhar diya hai
      res.status(201).json({ message: 'Review Added Successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

export default router;
