import { motion } from 'framer-motion';
import { Heart, MessageCircle, Instagram, ExternalLink } from 'lucide-react';

// --- IMAGES IMPORT (Zaroori Step) ---
// Kyunki images 'src/assest' mein hain, unhe import karna padega
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';

export default function InstagramFeed() {
  
  const posts = [
    { id: 1, src: img1, likes: "1.2k", comments: "45" },
    { id: 2, src: img2, likes: "856", comments: "23" },
    { id: 3, src: img3, likes: "2.1k", comments: "112" },
    { id: 4, src: img4, likes: "945", comments: "67" },
    { id: 5, src: img5, likes: "3.4k", comments: "201" },
    { id: 6, src: img6, likes: "1.1k", comments: "34" },
  ];

  return (
    <section className="py-20 bg-white border-t border-m-gold/10 font-montserrat">
      <div className="container mx-auto px-6 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-center items-center gap-2 mb-4 text-m-olive">
            <Instagram size={24} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold">@mariyam_mehendi_artist_04</span>
          </div>
          <h2 className="serif text-4xl text-m-brown italic mb-6">Follow Our Journey</h2>
          <p className="text-m-brown/60 text-sm max-w-2xl mx-auto">
            Join our community of 10k+ art lovers. Daily updates on Bridal Mehendi & Resin Art.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/mariyam_mehendi_artist_04"
              target="_blank"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group block overflow-hidden rounded-xl h-64 md:h-80 cursor-pointer"
            >
              {/* Image */}
              <img 
                src={post.src} 
                alt="Insta Post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />

              {/* Hover Overlay (Real Instagram Style) */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white gap-2">
                <div className="flex items-center gap-6 font-bold">
                  <div className="flex items-center gap-2">
                    <Heart fill="white" size={20} /> {post.likes}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle fill="white" size={20} /> {post.comments}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[10px] uppercase tracking-widest text-m-gold">
                  View Post <ExternalLink size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="mt-12">
          <a 
            href="https://instagram.com/mariyam_mehendi_artist_04" 
            target="_blank"
            className="inline-flex items-center gap-3 bg-m-olive text-white px-10 py-4 rounded-full uppercase text-[11px] tracking-[0.2em] font-bold hover:bg-m-brown transition-colors shadow-xl"
          >
            <Instagram size={18} /> Follow on Instagram
          </a>
        </div>

      </div>
    </section>
  );
}