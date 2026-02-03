import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  // --- FIX: Country Code '91' Add kiya ---
  const phoneNumber = "919409347705"; 
  
  // Message thoda professional kar diya
  const message = "Hello Mariyam! ✨ I loved your work on the website and want to inquire about bookings.";

  // --- FIX: Standard API Link (Better than wa.me) ---
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100]" // Bottom se thoda upar uthaya taaki footer mein na ghuse
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group"
      >
        {/* Glow Effect (Pulse) */}
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-[#25D366] rounded-full blur-md"
        ></motion.div>

        {/* Main Button */}
        <div className="bg-[#25D366] p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white relative z-10">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="WhatsApp" 
              className="w-8 h-8 filter drop-shadow-md"
            />
        </div>
        
        {/* Luxury Tooltip Effect */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-m-brown text-[10px] font-bold py-2 px-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none uppercase tracking-widest border border-m-gold/20">
          Chat with Mariyam
          {/* Tooltip Arrow */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-white transform rotate-45 border-r border-t border-m-gold/20"></div>
        </div>
        
      </motion.div>
    </a>
  );
}