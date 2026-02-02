import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import InstagramFeed from '../components/InstagramFeed';
import { ArrowRight, Sparkles, Star, ShoppingBag } from 'lucide-react';

// --- ANIMATIONS IMPORT ---
import { FadeUp, LuxuryTitle, ImageReveal } from '../components/AnimationWrappers';

// --- IMAGES IMPORT ---
// Ensure folder name is 'assets' (not 'assest')
import mehendiImg from '../assets/2.png'; 
import resinImg from '../assets/9.png'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  
  // Parallax Effect: Text scroll hone par dheere upar jayega
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);

  // ✅ LIVE BACKEND URL (Jo tune confirm kiya)
  const BACKEND_URL = "https://mariyam-mehendi.onrender.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Live Server se data fetch
        const { data } = await axios.get(`${BACKEND_URL}/api/products/all`);
        setProducts(data);
      } catch (err) { 
        console.error("Error fetching products:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#F5F2ED] min-h-screen font-montserrat overflow-x-hidden selection:bg-m-gold selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center border-b border-m-gold/20 overflow-hidden">
        <motion.div style={{ y: yHero }} className="text-center z-10 px-4">
          
          <FadeUp delay={0.2}>
            <div className="flex justify-center items-center gap-4 mb-6">
               <div className="h-[1px] w-12 bg-m-brown/40"></div>
               <span className="text-m-brown uppercase tracking-[0.4em] text-[10px] font-bold">Est. 2024</span>
               <div className="h-[1px] w-12 bg-m-brown/40"></div>
            </div>
          </FadeUp>

          {/* Luxury Text Animation */}
          <div className="font-playfair text-6xl md:text-9xl text-m-brown mb-6 italic leading-none flex flex-col items-center drop-shadow-sm">
             <LuxuryTitle text="Mariyam" />
             <LuxuryTitle text="Mehendi" className="text-m-olive" />
          </div>

          <FadeUp delay={0.6}>
            <p className="text-m-brown/70 max-w-lg mx-auto mb-10 text-sm tracking-wide leading-relaxed">
              Vapi's exclusive studio for organic bridal mehendi & handcrafted resin masterpieces.
            </p>
            <div className="flex justify-center gap-6">
               <motion.a 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 href="#shop" 
                 className="bg-m-brown text-white px-10 py-4 rounded-full uppercase text-[11px] tracking-[0.2em] font-bold hover:bg-m-olive transition-colors shadow-2xl flex items-center gap-3"
               >
                 Shop Collection <ShoppingBag size={14} />
               </motion.a>
            </div>
          </FadeUp>

        </motion.div>
        
        {/* Background Rotating Blobs (Animated) */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-10 w-64 h-64 bg-m-gold/10 rounded-full blur-[100px] pointer-events-none"></motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 right-10 w-64 h-64 bg-m-olive/10 rounded-full blur-[100px] pointer-events-none"></motion.div>
      </section>

      {/* --- CATEGORIES SECTION (Dark & Premium) --- */}
      <section className="py-24 bg-[#3E2723] text-[#F5F2ED] relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
              <div>
                 <span className="text-m-gold uppercase tracking-[0.4em] text-[10px] font-bold">Curated Collections</span>
                 <h2 className="serif text-5xl italic mt-2 text-white">Artistry & Craft</h2>
              </div>
              <Link to="/about" className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-m-gold transition-colors flex items-center gap-2 mt-4 md:mt-0">
                Our Story <ArrowRight size={14}/>
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mehendi Card */}
            <FadeUp delay={0.2}>
              <div className="group relative h-96 rounded-[40px] overflow-hidden cursor-pointer shadow-2xl border border-white/5 hover:border-m-gold/30 transition-all duration-500">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 opacity-80 group-hover:opacity-90 transition-all"></div>
                 
                 <ImageReveal src={mehendiImg} alt="Mehendi" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 
                 <div className="absolute bottom-10 left-10 z-30">
                    <h3 className="serif text-4xl italic mb-2 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Organic Cones</h3>
                    <p className="text-m-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">Dark Stain Guaranteed</p>
                 </div>
              </div>
            </FadeUp>

            {/* Resin Card */}
            <FadeUp delay={0.4}>
              <div className="group relative h-96 rounded-[40px] overflow-hidden cursor-pointer shadow-2xl border border-white/5 hover:border-m-gold/30 transition-all duration-500">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 opacity-80 group-hover:opacity-90 transition-all"></div>
                 
                 <ImageReveal src={resinImg} alt="Resin" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 
                 <div className="absolute bottom-10 left-10 z-30">
                    <h3 className="serif text-4xl italic mb-2 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Resin Gifts</h3>
                    <p className="text-m-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">Frames & Varmalas</p>
                 </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="shop" className="py-32 px-6 container mx-auto">
        <FadeUp>
          <div className="text-center mb-20">
            <motion.div 
              animate={{ rotate: [0, 15, -15, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="inline-block"
            >
              <Sparkles className="mx-auto text-m-gold mb-4" size={28} />
            </motion.div>
            <h2 className="serif text-5xl md:text-6xl text-m-brown italic">Bestsellers</h2>
            <div className="w-24 h-[1px] bg-m-olive mx-auto mt-8"></div>
          </div>
        </FadeUp>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-m-olive"></div>
             <p className="text-xs uppercase tracking-widest text-m-brown/60">Fetching Artworks...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.length > 0 ? (
                products.map((product, index) => (
                <FadeUp key={product._id} delay={index * 0.1}>
                    <ProductCard product={product} />
                </FadeUp>
                ))
            ) : (
                <div className="col-span-full text-center py-20">
                    <p className="serif text-2xl text-m-brown/50 italic">No products found yet.</p>
                </div>
            )}
          </div>
        )}
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-[#EFEBE4] border-y border-m-gold/10">
         <FadeUp>
           <div className="container mx-auto px-6 text-center max-w-4xl mx-auto">
              <div className="flex justify-center gap-2 mb-8 text-m-olive">
                 {[...Array(5)].map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                       <Star fill="currentColor" size={24} />
                    </motion.div>
                 ))}
              </div>
              <h3 className="serif text-3xl md:text-5xl text-m-brown italic mb-10 leading-snug">
                 "Sabse best mehendi cones Vapi mein! <br/> Color 2 din mein dark maroon ho gaya."
              </h3>
              <div className="flex flex-col items-center">
                <div className="w-10 h-[1px] bg-m-brown/20 mb-4"></div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-m-brown">Happy Customer</p>
                <p className="text-[9px] uppercase tracking-widest text-m-brown/50 mt-1">Gunjan Area, Vapi</p>
              </div>
           </div>
         </FadeUp>
      </section>

      <InstagramFeed />

      {/* --- FOOTER --- */}
      <footer className="bg-[#2D1B18] text-[#F5F2ED] py-24 border-t-4 border-m-gold">
        <div className="container mx-auto px-6 text-center">
           <h2 className="serif text-5xl mb-6 text-m-gold italic">Mariyam Mehendi</h2>
           <p className="text-xs uppercase tracking-widest opacity-60 mb-12 font-light">Handmade with Love • Delivered with Care</p>
           
           <div className="flex justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Link to="/" className="hover:text-m-gold transition-colors relative group">
                Home
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-m-gold transition-all group-hover:w-full"></span>
              </Link>
              <Link to="/about" className="hover:text-m-gold transition-colors relative group">
                Story
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-m-gold transition-all group-hover:w-full"></span>
              </Link>
              {/* WhatsApp Link with Country Code */}
              <a href="https://wa.me/919409347705" target="_blank" rel="noopener noreferrer" className="hover:text-m-gold transition-colors relative group">
                Contact
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-m-gold transition-all group-hover:w-full"></span>
              </a>
           </div>

           <div className="mt-16 pt-8 border-t border-white/5 text-[9px] text-white/20 uppercase tracking-widest">
             © 2024 Mariyam Mehendi Vapi. All Rights Reserved.
           </div>
        </div>
      </footer>
    </div>
  );
}