import { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, QrCode, Lock, ShieldCheck, MapPin, Phone, User, Copy } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  
  // --- CLIENT KI ASLI UPI ID YAHAN DALO ---
  // Is ID par paisa aayega
  const MERCHANT_UPI = "mariyam251704@oksbi"; // <--- CHANGE THIS TO REAL UPI ID
  const MERCHANT_NAME = "Mariyam Mehendi Studio";

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 1000 || subtotal === 0 ? 0 : 70;
  const grandTotal = subtotal + delivery;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online'); 
  const [transactionId, setTransactionId] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', pincode: '', state: ''
  });

  // QR Code Link Generator (Google Chart API ya QRServer use kar sakte hain)
  // Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${MERCHANT_UPI}%26pn=${encodeURIComponent(MERCHANT_NAME)}%26am=${grandTotal}%26cu=INR`;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty!");
    
    // Agar Online payment hai toh Transaction ID zaroori hai
    if (paymentMethod === 'online' && !transactionId) {
      alert("Please enter the Payment Transaction ID / UTR Number to verify.");
      return;
    }

    setLoading(true);

    const orderPayload = {
      customerName: formData.name,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      city: formData.city,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        product: item._id
      })),
      totalAmount: grandTotal,
      paymentMethod: paymentMethod === 'online' ? 'UPI_QR' : 'COD',
      paymentId: transactionId || 'COD_PENDING'
    };

    try {
      await saveOrderToDB(orderPayload);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const saveOrderToDB = async (orderData) => {
    try {
      // Backend Save
      await axios.post('https://mariyam-mehendi.onrender.com/api/orders/create', orderData);

      // WhatsApp Message
      const adminNumber = "919409347705";
      const itemsList = cart.map(item => `• ${item.name} (x${item.quantity})`).join('%0A');
      
      let message = `*✨ New Order Received!* %0A%0A` +
        `*Customer:* ${formData.name}%0A` +
        `*Phone:* ${formData.phone}%0A` +
        `*Amount:* ₹${grandTotal} (${paymentMethod === 'online' ? 'PAID via UPI' : 'COD'})%0A` +
        `*Address:* ${formData.city}, ${formData.pincode}%0A%0A`;
      
      if (paymentMethod === 'online') {
        message += `*Payment TXN ID:* ${transactionId} (Please Verify)%0A%0A`;
      }

      message += `*Order Items:*%0A${itemsList}`;

      window.open(`https://api.whatsapp.com/send?phone=${adminNumber}&text=${message}`, '_blank');
      
      clearCart();
      alert("Order Placed! Redirecting to WhatsApp...");
      navigate('/');
      
    } catch (error) {
      console.error("DB Save Failed", error);
      alert("Order save failed. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F2ED] min-h-screen pt-32 pb-20 px-4 md:px-8 font-montserrat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT: FORM SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="lg:col-span-7 space-y-8"
        >
          <div className="border-b border-m-gold/20 pb-6">
            <h1 className="serif text-4xl text-m-olive italic mb-2">Checkout</h1>
            <p className="text-xs uppercase tracking-[0.2em] text-m-brown/60">Secure Shipping & Payment</p>
          </div>

          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
            
            {/* Address Form */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/10">
              <h2 className="serif text-xl mb-6 text-m-brown flex items-center gap-3">
                <MapPin size={20} className="text-m-gold" /> Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Full Name</label>
                  <div className="bg-[#F9F7F4] rounded-xl px-4 py-3 flex items-center">
                    <User size={16} className="text-gray-400 mr-3"/>
                    <input required type="text" placeholder="Mariyam Khan" className="bg-transparent w-full outline-none text-m-brown"
                      onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Phone</label>
                  <div className="bg-[#F9F7F4] rounded-xl px-4 py-3 flex items-center">
                    <Phone size={16} className="text-gray-400 mr-3"/>
                    <input required type="tel" placeholder="98765 43210" className="bg-transparent w-full outline-none text-m-brown"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="md:col-span-2 group">
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Full Address</label>
                  <textarea required placeholder="Address details..." className="w-full bg-[#F9F7F4] rounded-xl px-4 py-3 outline-none text-m-brown h-24 resize-none"
                    onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <input required type="text" placeholder="City" className="w-full bg-[#F9F7F4] rounded-xl px-4 py-3 outline-none" onChange={(e) => setFormData({...formData, city: e.target.value})} />
                <input required type="text" placeholder="Pincode" className="w-full bg-[#F9F7F4] rounded-xl px-4 py-3 outline-none" onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/10">
              <h2 className="serif text-xl mb-6 text-m-brown flex items-center gap-3">
                <ShieldCheck size={20} className="text-m-gold" /> Payment Method
              </h2>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {/* Online UPI Option */}
                <div 
                  onClick={() => setPaymentMethod('online')}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all ${paymentMethod === 'online' ? 'border-m-olive bg-m-olive text-white' : 'border-gray-100 bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-widest text-xs flex items-center gap-2"><QrCode size={18}/> Pay via UPI / QR Code</span>
                    {paymentMethod === 'online' && <div className="w-4 h-4 bg-white rounded-full"></div>}
                  </div>
                </div>

                {/* COD Option */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all ${paymentMethod === 'cod' ? 'border-m-olive bg-m-olive text-white' : 'border-gray-100 bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Truck size={18}/> Cash on Delivery</span>
                    {paymentMethod === 'cod' && <div className="w-4 h-4 bg-white rounded-full"></div>}
                  </div>
                </div>
              </div>

              {/* QR Code Section (Only if Online selected) */}
              <AnimatePresence>
                {paymentMethod === 'online' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#F9F7F4] p-6 rounded-2xl border border-dashed border-m-gold/30 text-center">
                      <p className="text-xs uppercase tracking-widest text-m-brown/60 mb-4">Scan to Pay ₹{grandTotal}</p>
                      
                      {/* Dynamic QR Code */}
                      <div className="bg-white p-4 inline-block rounded-xl shadow-lg mb-4">
                        <img src={qrCodeUrl} alt="Payment QR" className="w-48 h-48 mix-blend-multiply" />
                      </div>
                      
                      <p className="text-[10px] text-gray-400 mb-4">Accepts GPay, PhonePe, Paytm</p>
                      
                      <div className="text-left">
                        <label className="text-[10px] uppercase font-bold text-m-olive mb-2 block">Enter Transaction ID / UTR Number</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="e.g. 1234567890" 
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full p-4 bg-white border border-m-gold/30 rounded-xl outline-none focus:border-m-olive text-m-brown font-bold tracking-widest"
                        />
                        <p className="text-[9px] text-red-400 mt-2">* Important for payment verification</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </form>
        </motion.div>

        {/* --- RIGHT: ORDER SUMMARY --- */}
        <div className="lg:col-span-5">
          <motion.div 
            className="bg-[#2D1B18] text-[#F5F2ED] p-8 rounded-[40px] shadow-2xl sticky top-32"
          >
            <h2 className="serif text-3xl italic mb-8 border-b border-white/10 pb-4">Your Selection</h2>
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar mb-8">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                   <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-m-gold text-sm">{item.name}</h4>
                      <p className="text-xs text-white/50 mt-1">Qty: {item.quantity}</p>
                   </div>
                   <p className="font-bold text-white">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm font-light border-t border-white/10 pt-6">
              <div className="flex justify-between text-white/70"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-white/70"><span>Shipping</span><span>₹{delivery}</span></div>
              <div className="flex justify-between text-3xl font-serif italic text-white mt-6 pt-6 border-t border-white/10">
                <span>Total</span><span>₹{grandTotal}</span>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('checkout-form').requestSubmit()}
              disabled={loading}
              className="w-full bg-m-gold text-m-brown py-5 rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-white transition-all shadow-lg mt-8 flex items-center justify-center gap-3"
            >
              {loading ? "Processing..." : (paymentMethod === 'online' ? "Confirm Payment" : "Place COD Order")}
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}