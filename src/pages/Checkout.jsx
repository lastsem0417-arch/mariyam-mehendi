import { useStore } from '../store';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Smartphone, CheckCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 1000 || subtotal === 0 ? 0 : 70;

  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', pincode: '', payment: 'upi'
  });

  const handleOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Bhai, cart khali hai!");

    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      totalAmount: subtotal + delivery,
      items: cart,
    };

    try {
      // 1. Save to Database
      await axios.post('https://mariyam-mehendi.onrender.com/api/orders/create', orderData);
      
      // 2. WhatsApp Redirect
      const phoneNumber = "9409347705"; // Mariyam ka number yahan dalo
      const itemsList = cart.map(item => `• ${item.name} (x${item.quantity})`).join('%0A');
      const message = `*Naya Order - Mariyam Mehendi*%0A%0A*Customer:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* ${orderData.address}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total: ₹${orderData.totalAmount}*`;
      
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      
      clearCart();
      alert("Order Successful! Details sent to WhatsApp.");
      navigate('/');
    } catch (err) {
      alert("Error: Order save nahi ho paya!");
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 bg-m-beige min-h-screen font-montserrat">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Shipping Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 shadow-2xl rounded-3xl border border-m-gold/10">
          <h2 className="serif text-4xl mb-8 text-m-olive italic">Shipping Details</h2>
          <form onSubmit={handleOrder} className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <input required type="text" placeholder="Full Name" className="w-full p-4 bg-m-beige/30 border border-m-gold/20 rounded-xl outline-none focus:border-m-olive transition-all" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required type="tel" placeholder="WhatsApp Number" className="w-full p-4 bg-m-beige/30 border border-m-gold/20 rounded-xl outline-none focus:border-m-olive transition-all" 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <textarea required placeholder="Full Delivery Address" className="w-full p-4 bg-m-beige/30 border border-m-gold/20 rounded-xl outline-none h-28 resize-none focus:border-m-olive" 
                onChange={(e) => setFormData({...formData, address: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="City" className="p-4 bg-m-beige/30 border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" 
                  onChange={(e) => setFormData({...formData, city: e.target.value})}/>
                <input required type="text" placeholder="Pincode" className="p-4 bg-m-beige/30 border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" 
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}/>
              </div>
            </div>

            <h3 className="serif text-xl mt-8 mb-4 text-m-brown italic">Payment Method</h3>
            <div className="space-y-3">
              {['upi', 'cod'].map((method) => (
                <label key={method} onClick={() => setFormData({...formData, payment: method})} 
                  className={`flex items-center gap-4 p-5 border rounded-2xl cursor-pointer transition-all ${formData.payment === method ? 'border-m-olive bg-m-olive/5 ring-1 ring-m-olive' : 'border-gray-100 hover:border-m-gold/50 bg-gray-50'}`}>
                  {method === 'upi' ? <Smartphone className="text-m-olive"/> : <Truck className="text-m-olive"/>}
                  <span className="flex-1 font-bold text-xs uppercase tracking-widest">{method === 'upi' ? 'Online Payment (UPI)' : 'Cash on Delivery'}</span>
                  {formData.payment === method && <CheckCircle size={20} className="text-m-olive" />}
                </label>
              ))}
            </div>

            <button type="submit" className="w-full bg-m-olive text-white py-5 rounded-2xl font-bold tracking-[0.3em] uppercase hover:bg-m-brown transition-all shadow-xl active:scale-95 mt-6">
              Complete Purchase — ₹{subtotal + delivery}
            </button>
          </form>
        </motion.div>

        {/* Right: Summary Card */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-m-brown text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-m-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h2 className="serif text-3xl mb-8 italic border-b border-white/10 pb-4">Your Selection</h2>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between items-center mb-4 border-b pb-4">
    <div className="flex items-center gap-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
      <div>
        <h4 className="font-bold text-m-brown">{item.name}</h4>
        <p className="text-xs text-m-brown/60">Qty: {item.quantity}</p>
      </div>
    </div>
    <p className="font-bold text-m-olive">₹{item.price * item.quantity}</p>
  </div>
))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 space-y-3 font-light text-sm">
              <div className="flex justify-between opacity-70"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between opacity-70"><span>Shipping</span><span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
              <div className="flex justify-between text-2xl font-serif italic text-m-gold pt-4 border-t border-white/5">
                <span>Grand Total</span><span>₹{subtotal + delivery}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}