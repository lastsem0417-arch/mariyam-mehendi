import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Saare Pages Import Karo
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetails from './pages/ProductDetails'; // <--- YE IMPORT ZAROORI HAI

// Components
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <Router>
      {/* Toast Notifications ke liye */}
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            background: '#3E2723',
            color: '#fff',
            border: '1px solid #D4AF37',
          },
        }} 
      />
      
      <Navbar />
      
      {/* Floating WhatsApp Button (Har page par dikhega) */}
      <FloatingWhatsApp />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* --- YE WALI LINE MISSING THI --- */}
        <Route path="/product/:id" element={<ProductDetails />} />
        
        {/* Admin Route */}
        <Route path="/admin-login-secret-04" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}