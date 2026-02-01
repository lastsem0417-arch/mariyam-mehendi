import { useStore } from '../store';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const cart = useStore(state => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll hone par navbar ka background change hoga
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Agar page change ho toh mobile menu band kar do
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`fixed w-full z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-[#F5F2ED]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="text-xl md:text-2xl font-playfair font-bold tracking-[0.2em] uppercase text-m-brown">
            Mariyam <span className="text-m-olive">Mehendi</span>
          </Link>
          
          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-bold text-m-brown">
            <Link to="/" className="hover:text-m-olive transition-colors relative group">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-m-olive transition-all group-hover:w-full"></span>
            </Link>
            
            {/* Shop Link Logic */}
            {location.pathname === '/' ? (
              <a href="#shop" className="hover:text-m-olive transition-colors cursor-pointer relative group">
                Shop
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-m-olive transition-all group-hover:w-full"></span>
              </a>
            ) : (
              <Link to="/" className="hover:text-m-olive transition-colors relative group">
                Shop
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-m-olive transition-all group-hover:w-full"></span>
              </Link>
            )}

            <Link to="/about" className="hover:text-m-olive transition-colors relative group">
              Our Story
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-m-olive transition-all group-hover:w-full"></span>
            </Link>

            {/* --- NEW CONTACT LINK --- */}
            <Link to="/contact" className="hover:text-m-olive transition-colors relative group">
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-m-olive transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-6">
            <Link to="/checkout" className="relative p-2 group">
              <ShoppingBag size={22} className="text-m-brown group-hover:text-m-olive transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-m-olive text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-m-brown">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-[#F5F2ED] flex flex-col items-center justify-center text-center"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-m-brown">
              <X size={32} />
            </button>

            <div className="flex flex-col gap-8 text-xl font-serif italic text-m-brown">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop Collection</a>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
              
              {/* --- NEW CONTACT LINK MOBILE --- */}
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              
              <Link to="/checkout" onClick={() => setMobileMenuOpen(false)} className="text-m-olive font-bold not-italic font-sans text-sm uppercase tracking-widest mt-4">
                View Cart ({cartCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}