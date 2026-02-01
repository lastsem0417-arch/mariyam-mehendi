import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now } // Review ki date
});

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  reviews: [reviewSchema], // Reviews ki list
  rating: { type: Number, required: true, default: 0 }, // Average Rating
  numReviews: { type: Number, required: true, default: 0 }, // Total Reviews count
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;