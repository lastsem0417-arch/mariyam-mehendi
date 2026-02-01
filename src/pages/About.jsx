import { motion } from 'framer-motion';
import { Star, Heart, Award, MapPin } from 'lucide-react';

// --- ANIMATIONS & IMAGES IMPORT ---
import { FadeUp, LuxuryTitle, ImageReveal } from '../components/AnimationWrappers';
import profileImg from '../assets/7.png'; // <--- IMAGE IMPORT FIX

export default function About() {
  const stats = [
    { label: "Handmade Cones", value: "10k+", icon: <Star size={20} /> },
    { label: "Happy Brides", value: "500+", icon: <Heart size={20} /> },
    { label: "Resin Art Pieces", value: "200+", icon: <Award size={20} /> },
    { label: "Studio Location", value: "Vapi", icon: <MapPin size={20} /> }
  ];

  return (
    <div className="bg-[#F5F2ED] min-h-screen pt-32 pb-20 font-montserrat overflow-hidden relative">
      
      {/* Background Animated Blobs (Consistency ke liye) */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute top-20 left-[-100px] w-96 h-96 bg-m-gold/10 rounded-full blur-[120px] pointer-events-none"></motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute bottom-40 right-[-100px] w-96 h-96 bg-m-olive/10 rounded-full blur-[120px] pointer-events-none"></motion.div>

      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left: Image with Reveal Effect */}
          <div className="md:w-1/2 relative w-full">
            <FadeUp>
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50">
                    <ImageReveal src={profileImg} alt="Mariyam - The Artist" className="h-[500px] w-full" />
                    
                    {/* Decorative Frame Border */}
                    <div className="absolute inset-4 border border-white/30 rounded-[30px] pointer-events-none"></div>
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -bottom-6 -right-6 bg-m-olive text-white p-6 rounded-full shadow-xl hidden md:block"
                >
                    <p className="text-center text-[10px] uppercase tracking-widest font-bold leading-tight">Since<br/><span className="text-2xl font-serif italic">2024</span></p>
                </motion.div>
            </FadeUp>
          </div>

          {/* Right: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <FadeUp delay={0.2}>
                <span className="text-m-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6 block">The Soul Behind the Brand</span>
            </FadeUp>
            
            <div className="mb-8">
                <LuxuryTitle text="Crafting" className="serif text-5xl md:text-6xl text-m-brown italic leading-tight" />
                <LuxuryTitle text="Memories in Vapi" className="serif text-5xl md:text-6xl text-m-olive italic leading-tight" />
            </div>

            <FadeUp delay={0.4}>
                <p className="text-m-brown/80 leading-relaxed mb-6 text-lg">
                "Mehendi sirf ek design nahi, ek ehsas hai." <span className="italic text-m-olive font-serif">Mariyam Mehendi</span> ki shuruat isi soch ke saath hui thi. 
                Vapi ki galiyon se nikal kar, aaj hum har us bride tak pahunch rahe hain jo apni shadi mein 
                <span className="font-bold text-m-brown"> shuddh (pure)</span> aur <span className="font-bold text-m-brown">gehre rang (dark stain)</span> ki talash mein hain.
                </p>
                <p className="text-m-brown/80 leading-relaxed text-sm">
                Humara har resin art piece aur har mehendi cone Mariyam ke apne hathon se banaya jata hai. 
                Koi machines nahi, koi loud chemicals nahi—sirf sacha hunar aur dher saara pyar.
                </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Dark Luxury Strip) --- */}
      <section className="bg-[#3E2723] py-20 mb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
              <FadeUp key={index} delay={index * 0.1}>
                <div className="flex flex-col items-center group">
                  <div className="text-m-gold mb-4 opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-2 duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-[#F5F2ED] text-4xl md:text-5xl font-serif italic mb-2">{stat.value}</h3>
                  <p className="text-m-gold/60 text-[10px] uppercase tracking-[0.3em]">{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="container mx-auto px-6 mb-32">
        <FadeUp>
            <h2 className="serif text-4xl md:text-5xl text-center text-m-brown italic mb-20">The Handmade Process</h2>
        </FadeUp>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Pure Ingredients", desc: "Hum sirf Rajasthani Sojat Mehendi use karte hain bina kisi milaawat ke.", num: "01" },
            { title: "Artisanal Resin", desc: "Har rose petal frame ko 72 ghante tak dhairya se set kiya jata hai.", num: "02" },
            { title: "Personalized Touch", desc: "Aapke orders ko hum custom-made banate hain, jaise aapki pasand.", num: "03" }
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.2}>
                <div className="bg-white p-10 rounded-[30px] shadow-xl border border-m-gold/10 text-center hover:border-m-olive transition-all duration-500 hover:-translate-y-2 group h-full">
                <div className="w-16 h-16 bg-[#F5F2ED] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-m-olive transition-colors duration-500">
                    <span className="text-m-olive font-serif italic text-xl group-hover:text-white">{item.num}</span>
                </div>
                <h4 className="serif text-2xl mb-4 text-m-brown italic group-hover:text-m-olive transition-colors">{item.title}</h4>
                <p className="text-sm text-m-brown/60 leading-relaxed tracking-wide">{item.desc}</p>
                </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* --- FINAL QUOTE --- */}
      <section className="text-center px-6 pb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto bg-white p-12 rounded-[40px] shadow-lg border border-m-gold/20 relative"
        >
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-m-brown text-m-gold w-12 h-12 flex items-center justify-center rounded-full text-2xl font-serif">"</div>
          
          <p className="serif text-2xl md:text-3xl italic text-m-brown leading-relaxed mt-4">
            We don't just sell products; <br/> we deliver pieces of our heart to your doorstep.
          </p>
          <div className="mt-8 flex flex-col items-center">
             <div className="w-12 h-[1px] bg-m-olive mb-4"></div>
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-m-olive">Mariyam Khan</p>
             <p className="text-[9px] text-m-brown/40 uppercase tracking-widest mt-1">Founder & Artist</p>
          </div>
        </motion.div>
      </section>
      
    </div>
  );
}