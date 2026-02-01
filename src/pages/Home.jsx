import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import InstagramFeed from '../components/InstagramFeed';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

// --- ANIMATIONS IMPORT ---
import { FadeUp, LuxuryTitle, ImageReveal } from '../components/AnimationWrappers';

// --- IMAGES IMPORT (Zaroori hai taaki photo broken na dikhe) ---
// Apne assets folder ke naam check kar lena (assets vs assest)
import mehendiImg from '../assets/2.png'; 
import resinImg from '../assets/9.png'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  
  // Parallax Effect (Hero text thoda dhere scroll hoga)
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/all');
        setProducts(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#F5F2ED] min-h-screen font-montserrat overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center border-b border-m-gold/20 overflow-hidden">
        <motion.div style={{ y: yHero }} className="text-center z-10 px-4">
          
          <FadeUp delay={0.2}>
            <div className="flex justify-center items-center gap-4 mb-6">
               <div className="h-[1px] w-12 bg-m-brown"></div>
               <span className="text-m-brown uppercase tracking-[0.4em] text-[10px] font-bold">Since 2024</span>
               <div className="h-[1px] w-12 bg-m-brown"></div>
            </div>
          </FadeUp>

          {/* Luxury Text Animation (Ek-ek letter upar aayega) */}
          <div className="font-playfair text-6xl md:text-9xl text-m-brown mb-6 italic leading-none flex flex-col items-center">
             <LuxuryTitle text="Mariyam" />
             <LuxuryTitle text="Mehendi" className="text-m-olive" />
          </div>

          <FadeUp delay={0.6}>
            <p className="text-m-brown/70 max-w-lg mx-auto mb-10 text-sm tracking-wide">
              Vapi's exclusive studio for organic bridal mehendi & handcrafted resin masterpieces.
            </p>
            <div className="flex justify-center gap-6">
               <motion.a 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 href="#shop" 
                 className="bg-m-brown text-white px-10 py-4 rounded-full uppercase text-[11px] tracking-[0.2em] font-bold hover:bg-m-olive transition-colors shadow-xl"
               >
                 Shop Now
               </motion.a>
            </div>
          </FadeUp>

        </motion.div>
        
        {/* Background Rotating Blobs */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-10 w-64 h-64 bg-m-gold/20 rounded-full blur-[100px]"></motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 right-10 w-64 h-64 bg-m-olive/10 rounded-full blur-[100px]"></motion.div>
      </section>

      {/* --- CATEGORIES SECTION (Dark & Premium) --- */}
      <section className="py-24 bg-m-olive text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/20 pb-6">
              <div>
                 <span className="text-m-gold uppercase tracking-[0.4em] text-[10px] font-bold">Collections</span>
                 <h2 className="serif text-5xl italic mt-2">Curated Art</h2>
              </div>
              <Link to="/about" className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-m-gold transition-colors flex items-center gap-2">
                Our Story <ArrowRight size={14}/>
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mehendi Card */}
            <FadeUp delay={0.2}>
              <div className="group relative h-96 rounded-[30px] overflow-hidden cursor-pointer shadow-2xl border border-white/10">
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-20"></div>
                 
                 {/* Image Animation Component use kiya hai */}
                 <ImageReveal src={mehendiImg} alt="Mehendi" className="h-full w-full" />
                 
                 <div className="absolute bottom-8 left-8 z-30">
                    <h3 className="serif text-3xl italic mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Organic Cones</h3>
                    <p className="text-white/80 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Dark Stain Guaranteed</p>
                 </div>
              </div>
            </FadeUp>

            {/* Resin Card */}
            <FadeUp delay={0.4}>
              <div className="group relative h-96 rounded-[30px] overflow-hidden cursor-pointer shadow-2xl border border-white/10">
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-20"></div>
                 
                 <ImageReveal src={resinImg} alt="Resin" className="h-full w-full" />
                 
                 <div className="absolute bottom-8 left-8 z-30">
                    <h3 className="serif text-3xl italic mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Resin Gifts</h3>
                    <p className="text-white/80 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Frames & Varmalas</p>
                 </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section id="shop" className="py-24 px-6 container mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              <Sparkles className="mx-auto text-m-olive mb-4" />
            </motion.div>
            <h2 className="serif text-5xl text-m-brown italic">Bestsellers</h2>
            <div className="w-16 h-[2px] bg-m-olive mx-auto mt-6"></div>
          </div>
        </FadeUp>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-m-olive"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <FadeUp key={product._id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeUp>
            ))}
          </div>
        )}
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-20 bg-[#EFEBE4] border-y border-m-gold/20">
         <FadeUp>
           <div className="container mx-auto px-6 text-center">
              <div className="flex justify-center gap-2 mb-6 text-m-olive">
                 {[...Array(5)].map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                       <Star fill="currentColor" size={20} />
                    </motion.div>
                 ))}
              </div>
              <h3 className="serif text-3xl md:text-4xl text-m-brown italic mb-6 leading-tight">
                 "Sabse best mehendi cones Vapi mein! <br/> Color 2 din mein dark maroon ho gaya."
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-m-brown/60">- Happy Customer from Gunjan Area</p>
           </div>
         </FadeUp>
      </section>

      <InstagramFeed />

      {/* --- FOOTER --- */}
      <footer className="bg-[#3E2723] text-[#F5F2ED] py-20">
        <div className="container mx-auto px-6 text-center">
           <h2 className="serif text-4xl mb-8 text-m-gold italic">Mariyam Mehendi</h2>
           <p className="text-xs uppercase tracking-widest opacity-60 mb-12">Handmade with Love • Delivered with Care</p>
           <div className="flex justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Link to="/" className="hover:text-m-gold">Home</Link>
              <Link to="/about" className="hover:text-m-gold">Story</Link>
              {/* Fix: Country code add kiya */}
              <a href="https://wa.me/919409347705" className="hover:text-m-gold">Contact</a>
           </div>
           <div className="mt-12 text-[9px] text-white/20 uppercase tracking-widest">
             © 2024 Mariyam Mehendi Vapi. All Rights Reserved.
           </div>
        </div>
      </footer>
    </div>
  );
}