import { motion } from 'framer-motion';
import { Heart, MessageCircle, Instagram, ExternalLink, Palette } from 'lucide-react';

// --- IMAGES IMPORT ---
import img1 from '../assets/1.png';
import img2 from '../assets/8.png';
import img3 from '../assets/9.png';
import img4 from '../assets/7.png';
import img5 from '../assets/4.png';
import img6 from '../assets/6.png';

export default function InstagramFeed() {
  
  // --- STEP 1: YAHAN DONO INSTAGRAM LINKS DALO ---
  const MEHENDI_LINK = "https://instagram.com/mariyam_mehendi_artist_04";
  
  // 👇 YAHAN RESIN WALI ID KA LINK DAL DENA
  const RESIN_LINK = "https://www.instagram.com/khan_resin_studio"; // <--- CHANGE THIS

  // --- STEP 2: HAR PHOTO KO SAHI LINK ASSIGN KARO ---
  // Jo photo Mehendi ki hai usme 'url: MEHENDI_LINK'
  // Jo photo Resin ki hai usme 'url: RESIN_LINK'
  const posts = [
    // Maan lete hain pehli 3 Mehendi hain
    { id: 1, src: img1, likes: "1.2k", comments: "45", type: "Resin Art", url: RESIN_LINK },
    { id: 2, src: img2, likes: "856", comments: "23", type: "Mehendi Art", url: MEHENDI_LINK },
    { id: 3, src: img3, likes: "2.1k", comments: "112", type: "Resin Art", url: RESIN_LINK },
    
    // Aur aakhri 3 Resin hain (Tu apne hisaab se mix kar sakta hai)
    { id: 4, src: img4, likes: "945", comments: "67", type: "Mehendi Art", url: MEHENDI_LINK },
    { id: 5, src: img5, likes: "3.4k", comments: "201", type: "Resin Art", url: RESIN_LINK },
    { id: 6, src: img6, likes: "1.1k", comments: "34", type: "Mehendi Art", url: MEHENDI_LINK },
  ];

  return (
    <section className="py-20 bg-white border-t border-m-gold/10 font-montserrat">
      <div className="container mx-auto px-6 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-center items-center gap-2 mb-4 text-m-olive">
            <Instagram size={24} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold">@mariyam_studio</span>
          </div>
          <h2 className="serif text-4xl text-m-brown italic mb-6">Follow Our Journey</h2>
          <p className="text-m-brown/60 text-sm max-w-2xl mx-auto">
            Join our community of art lovers. Daily updates on Bridal Mehendi & Resin Art.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.url} // <--- YAHAN AUTOMATIC SAHI LINK UTHAYEGA
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group block overflow-hidden rounded-xl h-64 md:h-80 cursor-pointer shadow-md hover:shadow-xl transition-all"
            >
              {/* Image */}
              <img 
                src={post.src} 
                alt="Insta Post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white gap-2">
                
                {/* Type Badge (Mehendi/Resin) */}
                <span className="bg-m-gold/20 border border-m-gold text-m-gold px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold mb-2 backdrop-blur-sm">
                    {post.type}
                </span>

                <div className="flex items-center gap-6 font-bold">
                  <div className="flex items-center gap-2">
                    <Heart fill="white" size={18} /> {post.likes}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle fill="white" size={18} /> {post.comments}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/80 hover:text-m-gold transition-colors">
                  View Profile <ExternalLink size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Buttons (Dual Buttons for both profiles) */}
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-6">
          <a 
            href={MEHENDI_LINK} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-m-olive text-white px-8 py-4 rounded-full uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-m-brown transition-all shadow-xl hover:-translate-y-1"
          >
            <Instagram size={18} /> Follow Mehendi
          </a>
          
          <a 
            href={RESIN_LINK} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-m-brown border border-m-gold/30 px-8 py-4 rounded-full uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-m-gold hover:text-white transition-all shadow-xl hover:-translate-y-1"
          >
            <Palette size={18} /> Follow Resin Art
          </a>
        </div>

      </div>
    </section>
  );
}