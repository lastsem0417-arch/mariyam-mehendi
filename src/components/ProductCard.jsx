import { useStore } from '../store';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; // <--- Link Import kiya
import { Star } from 'lucide-react'; // <--- Star Icon Import kiya

export default function ProductCard({ product }) {
  const addToCart = useStore(state => state.addToCart);

  const handleAdd = (e) => {
    e.preventDefault(); // Link click hone se rokega agar button dabaya
    e.stopPropagation();
    
    addToCart(product);
    
    toast.success(`${product.name} bag mein daal diya! 🛍️`, {
      style: {
        background: '#3E2723',
        color: '#fff',
        border: '1px solid #D4AF37',
      },
      iconTheme: {
        primary: '#D4AF37',
        secondary: '#3E2723',
      },
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-m-gold/10 hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      {/* --- IMAGE SECTION (Clickable) --- */}
      <div className="relative h-80 overflow-hidden cursor-pointer">
        <Link to={`/product/${product._id}`} className="block h-full w-full">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        
        {/* Add to Cart Button (Only visible on Hover) */}
        <button 
          onClick={handleAdd}
          className="absolute bottom-0 left-0 w-full bg-m-olive text-white py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-bold uppercase tracking-[0.2em] text-xs hover:bg-m-brown z-10"
        >
          Add to Cart
        </button>
      </div>

      {/* --- DETAILS SECTION --- */}
      <div className="p-6 text-center flex flex-col flex-grow">
        {/* Name (Clickable) */}
        <Link to={`/product/${product._id}`}>
           <h3 className="font-playfair text-xl text-m-brown mb-2 hover:text-m-olive transition-colors cursor-pointer">
             {product.name}
           </h3>
        </Link>
        
        <p className="text-m-olive font-bold text-lg mb-2">₹{product.price}</p>
        
        {/* Star Rating Preview (Sirf tab dikhega agar rating > 0 hai) */}
        {product.rating > 0 && (
           <div className="flex justify-center items-center gap-1 text-m-gold text-[10px] mt-auto">
             <div className="flex">
               {[...Array(5)].map((_, i) => (
                 <Star 
                   key={i} 
                   size={12} 
                   fill={i < Math.round(product.rating) ? "currentColor" : "none"} 
                   className={i < Math.round(product.rating) ? "text-m-gold" : "text-gray-300"} 
                 />
               ))}
             </div>
             <span className="text-m-brown/40 font-bold ml-1">({product.numReviews})</span>
           </div>
        )}
      </div>
    </motion.div>
  );
}