import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const phoneNumber = "9409347705"; // Mariyam ka number yahan dalo
  const message = "Hi Mariyam, I saw your website and want to know more!";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#25D366] p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white relative group"
      >
        {/* WhatsApp Icon */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp" 
          className="w-8 h-8"
        />
        
        {/* Tooltip Effect */}
        <div className="absolute right-full mr-4 bg-white text-m-brown text-[10px] font-bold py-2 px-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
          Chat with Mariyam
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>
      </motion.div>
    </a>
  );
}