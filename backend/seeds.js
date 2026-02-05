import mongoose from 'mongoose';
import dotenv from 'dotenv';

// .env config load karo (taaki Mongo URL mile)
dotenv.config();

// --- PRODUCT SCHEMA (Jo tere project mein hai) ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 10 },
  rating: { type: Number, required: true, default: 5 },
  numReviews: { type: Number, required: true, default: 1 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// --- PRODUCT LIST (Luxury Images ke saath) ---
const products = [
  // --- MEHENDI CATEGORY ---
  {
    name: "Organic Bridal Mehendi Cone",
    image: "8.png",
    description: "100% Organic, Triple-sifted henna powder. Dark maroon stain guaranteed within 48 hours. Chemical-free and skin-friendly.",
    price: 50,
    category: "Mehendi",
    countInStock: 100,
    rating: 5
  },
  {
    name: "Organic Nail Cones (Maroon)",
    image: "https://i.pinimg.com/736x/8a/6c/a0/8a6ca059530490b8f10660370d91244e.jpg",
    description: "Specialized organic henna for nails. Gives a natural nail-paint look with long-lasting stain. Enriched with essential oils.",
    price: 70,
    category: "Mehendi",
    countInStock: 50,
    rating: 4.8
  },

  // --- RESIN ART & KEYCHAINS ---
  {
    name: "Resin Keychain",
    image: "https://i.etsystatic.com/23126487/r/il/649175/3173752669/il_fullxfull.3173752669_4m55.jpg",
    description: "Handcrafted alphabet keychain with  dried flowers. A perfect personalized gift.",
    price: 150,
    category: "Resin",
    countInStock: 20,
    rating: 4.9
  },
  {
    name: "Customized Letter Keychain",
    image: "https://m.media-amazon.com/images/I/71w+b0o+G-L._AC_SL1500_.jpg",
    description: "Choose your initial! Crystal clear resin with customizable glitters and pigments. Durable and stylish.",
    price: 120,
    category: "Resin",
    countInStock: 30,
    rating: 4.7
  },
  {
    name: "Floral Resin Phone Case",
    image: "https://i.etsystatic.com/18654483/r/il/15600c/3085532279/il_fullxfull.3085532279_j6j1.jpg",
    description: "Protect your phone in style. Real pressed flowers embedded in high-quality resin. Available for all iPhone and Samsung models.",
    price: 599,
    category: "Resin",
    countInStock: 15,
    rating: 5
  },

  // --- PRESERVATION & FRAMES ---
  {
    name: "Customized Pooja thali)",
    image: "1.png",
    description: "Preserve your wedding memories forever. We encapsulate your Varmala roses in a crystal clear resin block.",
    price: 2500,
    category: "Resin",
    countInStock: 5,
    rating: 5
  },
  {
    name: "Customized Wedding Platter",
    image: "https://m.media-amazon.com/images/I/81h+yTq+yZL._AC_SL1500_.jpg",
    description: "Luxury Resin Nikaah/Engagement Platter. Personalized with names and dates. Featuring golden handles and geode art work.",
    price: 1200,
    category: "Resin",
    countInStock: 10,
    rating: 4.8
  },
  {
    name: "Customized plates",
    image: "4.png",
    description: "6x6 inch Resin Photo Frame with LED light options. Gold edges and floral preservation. Best for anniversaries.",
    price: 850,
    category: "Resin",
    countInStock: 15,
    rating: 4.9
  },
  {
    name: "Luxury Geode Wall Clock",
    image: "https://i.etsystatic.com/26687483/r/il/6b1574/3160408542/il_fullxfull.3160408542_kn3q.jpg",
    description: "12-inch Resin Wall Clock with real crystals and gold pigments. A masterpiece for your living room wall.",
    price: 1800,
    category: "Resin",
    countInStock: 8,
    rating: 5
  },

  // --- ACCESSORIES ---
  {
    name: "Customized Handcrafted Jhumka",
    image: "https://i.pinimg.com/736x/2a/54/1b/2a541b650221382436f566453187216a.jpg",
    description: "Hand-painted floral jhumkas. Lightweight and customized to match your outfit. Available in multiple colors.",
    price: 250,
    category: "Jewellery",
    countInStock: 25,
    rating: 4.7
  }
];

// --- SEED FUNCTION ---
const importData = async () => {
  try {
    // 1. Connect to Database
    // Yahan agar local URI fail ho toh apna Render wala Live URI daal dena string mein
    await mongoose.connect(process.env.MONGO_URI);

    console.log('🔥 MongoDB Connected...');

    // 2. Clear Old Data (Taaki duplicates na bane)
    await Product.deleteMany();
    console.log('🧹 Old Products Cleared...');

    // 3. Insert New Data
    await Product.insertMany(products);
    console.log('✅ All Products Added Successfully!');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();