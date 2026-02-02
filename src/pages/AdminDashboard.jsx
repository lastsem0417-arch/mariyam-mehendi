import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LogOut, Package, List, Upload, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });
  const [product, setProduct] = useState({ name: '', price: '', category: 'Mehendi', description: '' });
  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ YAHAN TERA CONFIRMED BACKEND URL HAI
  const BACKEND_URL = "https://mariyam-mehendi.onrender.com"; 

  const handleLogin = (e) => {
    e.preventDefault();
    // Login Credentials
    if(user.username === "mariyam04" && user.password === "mehendi@2026") setIsLoggedIn(true);
    else alert("Access Denied!");
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch Orders from Live Backend
      axios.get(`${BACKEND_URL}/api/orders/all`)
        .then(res => setOrders(res.data))
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, [isLoggedIn]);

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    formData.append('image', file);

    try {
      // Upload Product to Live Backend
      const res = await axios.post(`${BACKEND_URL}/api/products/add`, formData);
      console.log("Server Response:", res.data); 
      
      alert("Product Published Successfully! 🎉");
      
      // Reset Form
      setProduct({ name: '', price: '', category: 'Mehendi', description: '' });
      setFile(null);
      document.getElementById('fileInput').value = ""; 

    } catch (err) { 
      console.error("Upload Error Details:", err);
      // Agar error aaye toh alert mein dikhega kyun aaya
      alert(`Upload Failed: ${err.response?.data?.message || err.message}`);
    } finally { 
      setLoading(false); 
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5F2ED] px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 shadow-2xl rounded-3xl w-full max-w-md border border-m-gold/20">
          <h2 className="serif text-3xl mb-8 text-center text-m-olive italic font-bold">Studio Access</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="text" placeholder="Username" className="w-full p-4 bg-[#F5F2ED] border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" onChange={(e) => setUser({...user, username: e.target.value})} />
            <input type="password" placeholder="Password" className="w-full p-4 bg-[#F5F2ED] border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" onChange={(e) => setUser({...user, password: e.target.value})} />
            <button className="w-full bg-m-olive text-white py-4 rounded-xl shadow-lg hover:bg-m-brown transition-all uppercase tracking-[0.2em] font-bold text-xs mt-4">Login to Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto font-montserrat min-h-screen bg-[#F5F2ED]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-m-gold/20 pb-8 gap-6">
        <div>
          <h1 className="serif text-5xl text-m-olive italic">Studio Control</h1>
          <p className="text-xs text-m-brown opacity-60 tracking-[0.3em] uppercase mt-2 font-bold">Official Business Management</p>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 px-6 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-all text-xs font-bold uppercase tracking-widest">
          <LogOut size={14} /> Exit Studio
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* FORM SECTION */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-m-gold/10">
            <h3 className="serif text-2xl mb-8 text-m-olive flex items-center gap-2 italic"><Package /> Add New Art</h3>
            <form onSubmit={handlePublish} className="space-y-5">
              <input required type="text" placeholder="Product Name" value={product.name} className="w-full p-4 bg-[#F5F2ED] border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" onChange={(e) => setProduct({...product, name: e.target.value})} />
              <input required type="number" placeholder="Price (₹)" value={product.price} className="w-full p-4 bg-[#F5F2ED] border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" onChange={(e) => setProduct({...product, price: e.target.value})} />
              <select className="w-full p-4 bg-[#F5F2ED] border border-m-gold/20 rounded-xl outline-none" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})}>
                <option value="Mehendi">Mehendi Product</option>
                <option value="Resin">Resin Art</option>
              </select>
              <textarea placeholder="Description..." value={product.description} className="w-full p-4 bg-[#F5F2ED] border border-m-gold/20 rounded-xl outline-none h-32 resize-none" onChange={(e) => setProduct({...product, description: e.target.value})} />
              
              <div className="border-2 border-dashed border-m-gold/30 rounded-2xl p-6 text-center hover:bg-[#F5F2ED] transition-all cursor-pointer relative">
                <input 
                    id="fileInput" 
                    required 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                />
                <Upload className="mx-auto text-m-olive mb-2" size={24} />
                <p className="text-[10px] uppercase font-bold text-m-brown opacity-60 tracking-widest">{file ? file.name : "Select High-Res Photo"}</p>
              </div>
              
              <button disabled={loading} className="w-full bg-m-olive text-white py-5 rounded-2xl font-bold tracking-[0.4em] uppercase hover:bg-m-brown transition-all shadow-xl active:scale-95 disabled:opacity-50">
                {loading ? "Publishing..." : "Add to Boutique"}
              </button>
            </form>
          </div>
        </div>

        {/* ORDER LIST SECTION */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-m-gold/10 overflow-hidden">
            <h3 className="serif text-2xl mb-8 text-m-olive flex items-center gap-2 italic"><List /> Recent Orders</h3>
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              {orders.map(order => (
                <div key={order._id} className="p-6 bg-[#F5F2ED] rounded-2xl border border-m-gold/10 hover:border-m-gold/40 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-m-brown uppercase text-sm">{order.customerName}</p>
                      <p className="text-[10px] text-m-gold font-bold tracking-widest">{order.phone}</p>
                    </div>
                    <span className="bg-m-olive text-white text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter italic">₹{order.totalAmount}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 line-clamp-1 mb-4 italic">{order.address}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-m-olive/60 uppercase">{new Date(order.createdAt).toLocaleDateString()}</span>
                    
                    <button 
                        onClick={() => window.open(`https://api.whatsapp.com/send?phone=${order.phone.length < 11 ? '91' + order.phone : order.phone}`, '_blank')} 
                        className="text-[9px] font-bold text-m-brown hover:text-m-gold transition-colors flex items-center gap-1 uppercase tracking-widest underline decoration-m-gold/30"
                    >
                      Contact <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-center text-gray-400 italic py-10">Waiting for first order...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}