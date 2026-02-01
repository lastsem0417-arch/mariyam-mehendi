import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';

// --- ANIMATIONS IMPORT ---
// Hum wahi animations use karenge jo Home aur About mein kiye the consistency ke liye
import { FadeUp, LuxuryTitle } from '../components/AnimationWrappers';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- WHATSAPP LOGIC (Fail-Proof) ---
    const phoneNumber = "919409347705"; // Country code ke saath
    
    // Message ko encode karna zaroori hai taaki spaces aur special chars issue na karein
    const text = `*New Inquiry from Website* ✨%0A%0A*Name:* ${formData.name}%0A*Message:* ${formData.message}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;

    // Thoda delay taaki user animation dekh sake, fir redirect
    setTimeout(() => {
        window.location.href = whatsappUrl;
        setIsSubmitting(false);
    }, 1000);
  };

  // Stagger Animation for List Items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-32 pb-20 px-6 bg-[#F5F2ED] min-h-screen font-montserrat relative overflow-hidden">
      
      {/* Background Animated Blobs (Luxury Vibe) */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-[500px] h-[500px] bg-m-gold/10 rounded-full blur-[120px] pointer-events-none"></motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-m-olive/10 rounded-full blur-[120px] pointer-events-none"></motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-20">
          <FadeUp>
             <LuxuryTitle text="Get in Touch" className="serif text-5xl md:text-6xl text-m-olive italic mb-6" />
             <div className="flex justify-center items-center gap-4">
                <div className="h-[1px] w-12 bg-m-gold"></div>
                <p className="text-m-brown/60 text-xs uppercase tracking-[0.3em] font-bold">We'd love to craft for you</p>
                <div className="h-[1px] w-12 bg-m-gold"></div>
             </div>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- LEFT: CONTACT INFO CARD --- */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#3E2723] text-[#F5F2ED] p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
            
            <h2 className="serif text-4xl mb-10 italic text-m-gold relative z-10">Contact Info</h2>
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                className="space-y-10 relative z-10"
            >
              {/* Location */}
              <motion.div variants={itemVariants} className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-m-gold group-hover:text-m-brown transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-m-gold mb-2">Studio Location</h3>
                  <p className="text-sm opacity-80 leading-relaxed font-light">Chanod colony,<br/>Vapi, Gujarat - 396191</p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-m-gold group-hover:text-m-brown transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-m-gold mb-2">Phone / WhatsApp</h3>
                  <p className="text-sm opacity-80 font-light">+91 9409347705</p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-m-gold group-hover:text-m-brown transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-m-gold mb-2">Email</h3>
                  <p className="text-sm opacity-80 font-light">Mariyamkhan2504@gmail.com</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <div className="mt-16 pt-8 border-t border-white/10 flex gap-8 relative z-10">
               {['Instagram', 'Facebook'].map((social, i) => (
                   <a key={i} href="#" className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-m-gold transition-colors group">
                       {social} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                   </a>
               ))}
            </div>
          </motion.div>

          {/* --- RIGHT: INQUIRY FORM --- */}
          <FadeUp delay={0.3}>
            <div className="bg-white/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] shadow-xl border border-white/50">
                <div className="mb-10">
                    <span className="text-m-olive uppercase tracking-widest text-[10px] font-bold">Have a question?</span>
                    <h2 className="serif text-4xl mt-2 text-m-brown italic">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                <div className="group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-m-brown mb-3 block group-focus-within:text-m-olive transition-colors">Your Name</label>
                    <input 
                    required 
                    type="text" 
                    placeholder="e.g. Anjali Sharma" 
                    className="w-full p-5 bg-white border border-m-gold/20 rounded-2xl outline-none focus:border-m-olive focus:ring-1 focus:ring-m-olive transition-all placeholder:text-gray-300"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div className="group">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-m-brown mb-3 block group-focus-within:text-m-olive transition-colors">Your Message</label>
                    <textarea 
                    required 
                    placeholder="I want to book a bridal appointment..." 
                    className="w-full p-5 bg-white border border-m-gold/20 rounded-2xl outline-none h-40 resize-none focus:border-m-olive focus:ring-1 focus:ring-m-olive transition-all placeholder:text-gray-300"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                </div>

                <button 
                    disabled={isSubmitting}
                    className="w-full bg-m-olive text-white py-5 rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-m-brown transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSubmitting ? "Opening WhatsApp..." : (
                        <>
                            Send to WhatsApp 
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
                </form>
            </div>
          </FadeUp>

        </div>
      </div>
    </div>
  );
}