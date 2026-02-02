import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../store';
import { Star, ShoppingBag, ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const addToCart = useStore((state) => state.addToCart);

  // Product Fetch Karna
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`https://mariyam-mehendi.onrender.com/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  // Review Submit Karna
  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://mariyam-mehendi.onrender.com/api/products/${id}/review`, { name, rating, comment });
      toast.success("Review Submitted! Thank you 💖");
      setName('');
      setComment('');
      // Refresh data to show new review
      const { data } = await axios.get(`https://mariyam-mehendi.onrender.com/api/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error("Review failed, try again!");
    }
  };

  if (!product) return <div className="text-center pt-40">Loading Luxury...</div>;

  return (
    <div className="bg-m-beige min-h-screen pt-32 pb-20 px-6 font-montserrat">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="flex items-center gap-2 text-m-brown mb-8 text-xs font-bold uppercase tracking-widest hover:text-m-gold transition-colors">
          <ArrowLeft size={16} /> Back to Boutique
        </Link>

        {/* --- PRODUCT SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="rounded-[40px] overflow-hidden shadow-2xl border border-white/20">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <span className="text-m-gold uppercase tracking-[0.3em] text-xs font-bold mb-4">{product.category} Collection</span>
            <h1 className="serif text-5xl text-m-brown italic mb-6">{product.name}</h1>
            
            {/* Rating Stars Display */}
            <div className="flex items-center gap-2 mb-6">
               <div className="flex text-m-gold">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={20} fill={i < Math.round(product.rating) ? "currentColor" : "none"} className={i < Math.round(product.rating) ? "text-m-gold" : "text-gray-300"} />
                 ))}
               </div>
               <span className="text-xs text-m-brown/60 font-bold">({product.numReviews} Reviews)</span>
            </div>

            <p className="text-m-brown/80 leading-relaxed mb-8 text-lg">{product.description}</p>
            <h3 className="text-4xl font-bold text-m-olive mb-10">₹{product.price}</h3>

            <button 
              onClick={() => { addToCart(product); toast.success("Added to Bag 🛍️"); }}
              className="bg-m-brown text-white py-5 px-10 rounded-full font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-m-olive transition-all flex items-center justify-center gap-4 w-fit"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </motion.div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-m-gold/20 pt-16">
          
          {/* 1. Review Form */}
          <div>
            <h3 className="serif text-3xl text-m-brown italic mb-8">Write a Review</h3>
            <form onSubmit={submitReview} className="bg-white p-8 rounded-[30px] shadow-xl border border-m-gold/10 space-y-6">
              <div>
                <label className="text-[10px] uppercase font-bold text-m-brown tracking-widest block mb-2">Your Name</label>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-m-beige/50" placeholder="e.g. Priya Singh" />
              </div>
              
              <div>
                <label className="text-[10px] uppercase font-bold text-m-brown tracking-widest block mb-2">Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full bg-m-beige/50">
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Terrible</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-m-brown tracking-widest block mb-2">Your Experience</label>
                <textarea required value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-m-beige/50 h-32 resize-none" placeholder="Tell us what you liked..." />
              </div>

              <button className="w-full bg-m-olive text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-m-brown transition-colors">
                Submit Review
              </button>
            </form>
          </div>

          {/* 2. Existing Reviews List */}
          <div>
            <h3 className="serif text-3xl text-m-brown italic mb-8">Customer Love</h3>
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {product.reviews.length === 0 && (
                <p className="text-m-brown/50 italic">No reviews yet. Be the first to review!</p>
              )}
              {product.reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-m-gold/5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-m-brown text-sm uppercase tracking-wide">{review.name}</h4>
                      <div className="flex text-m-gold text-[10px] mt-1">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-m-brown/70 text-sm italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}