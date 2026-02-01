import { motion } from 'framer-motion';

// 1. FADE UP (Har section ke liye - Scroll karte waqt smooth upar aayega)
export const FadeUp = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.25, 0.25, 0.75] }}
    >
      {children}
    </motion.div>
  );
};

// 2. LUXURY TEXT REVEAL (Hero Titles ke liye - Ek ek shabd upar aayega)
export const LuxuryTitle = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <h1 className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

// 3. IMAGE SCALE (Photos ke liye - Dheere se zoom out effect)
export const ImageReveal = ({ src, alt, className }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};