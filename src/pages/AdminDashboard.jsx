import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Package, List, Upload, Trash2, Edit2, 
  LayoutDashboard, IndianRupee, ShoppingBag, X, Search, ChevronRight, Plus, ShieldCheck 
} from 'lucide-react';

export default function AdminDashboard() {
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });
  
  // --- DATA STATES ---
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'orders'
  
  // --- FORM STATES ---
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // Form dikhana hai ya nahi
  const [editId, setEditId] = useState(null); // Edit mode check karne ke liye
  
  const [productForm, setProductForm] = useState({ 
    name: '', price: '', category: 'Mehendi', description: '' 
  });
  const [file, setFile] = useState(null);

  // ✅ LIVE BACKEND URL
  const BACKEND_URL = "https://mariyam-mehendi.onrender.com"; 

  // ==========================================
  // 🔐 SECURITY & LOGIN LOGIC
  // ==========================================
  
  useEffect(() => {
    // Page load hote hi check karo ki banda pehle se login hai kya
    const isLogged = localStorage.getItem('mariyam_admin_secure');
    if (isLogged === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // HARDCODED CREDENTIALS (Secure enough for college project)
    if(user.username === "mariyam04" && user.password === "mehendi@2026") {
      setIsAuthenticated(true);
      localStorage.setItem('mariyam_admin_secure', 'true'); // Session save kar liya
      fetchData();
    } else {
      alert("❌ Access Denied! Galat password mat daal.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mariyam_admin_secure');
    window.location.reload();
  };

  // ==========================================
  // 📡 DATA OPERATIONS
  // ==========================================

  const fetchData = async () => {
    try {
      const ordersRes = await axios.get(`${BACKEND_URL}/api/orders/all`);
      const productsRes = await axios.get(`${BACKEND_URL}/api/products/all`);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (err) { console.error("Data Load Error", err); }
  };

  // --- DELETE ---
  const handleDelete = async (id) => {
    if(!window.confirm("⚠️ Warning: Ye art piece hamesha ke liye delete ho jayega. Confirm?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/products/delete/${id}`);
      fetchData();
    } catch(err) { alert("Delete Failed"); }
  };

  // --- OPEN ADD FORM (Button Fix) ---
  const openAddForm = () => {
    setEditId(null); // Clear Edit Mode
    setProductForm({ name: '', price: '', category: 'Mehendi', description: '' });
    setFile(null);
    setShowForm(true); // Open Form
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- OPEN EDIT FORM ---
  const handleEditClick = (prod) => {
    setEditId(prod._id);
    setProductForm({
      name: prod.name,
      price: prod.price,
      category: prod.category,
      description: prod.description
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(productForm).forEach(key => formData.append(key, productForm[key]));
    if (file) formData.append('image', file);

    try {
      if (editId) {
        await axios.put(`${BACKEND_URL}/api/products/update/${editId}`, formData);
        alert("✨ Product Updated!");
      } else {
        await axios.post(`${BACKEND_URL}/api/products/add`, formData);
        alert("🎉 New Product Added!");
      }
      setShowForm(false);
      resetForm();
      fetchData();
    } catch (err) { 
      alert("Operation Failed!"); 
    } finally { 
      setLoading(false); 
    }
  };

  const resetForm = () => {
    setProductForm({ name: '', price: '', category: 'Mehendi', description: '' });
    setFile(null);
    if(document.getElementById('fileInput')) document.getElementById('fileInput').value = "";
  };

  // --- STATS ---
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  // ==========================================
  // 🎨 VIEW 1: LOGIN SCREEN (HIGH SECURITY LOOK)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1A1A1A] px-6 font-montserrat relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-m-gold/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-m-olive/10 rounded-full blur-[150px] animate-pulse"></div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-black/40 backdrop-blur-2xl p-12 shadow-2xl rounded-[30px] w-full max-w-md border border-white/10 relative z-10"
        >
          <div className="text-center mb-10">
            <ShieldCheck size={48} className="mx-auto text-m-gold mb-4" />
            <h2 className="serif text-3xl text-white italic mb-2">Mariyam Studio</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Restricted Admin Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-m-gold font-bold">Secure ID</label>
                <input type="text" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-m-gold text-white transition-all" onChange={(e) => setUser({...user, username: e.target.value})} />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-m-gold font-bold">Passkey</label>
                <input type="password" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-m-gold text-white transition-all" onChange={(e) => setUser({...user, password: e.target.value})} />
            </div>
            <button className="w-full bg-gradient-to-r from-m-gold to-yellow-600 text-black py-4 rounded-xl shadow-lg hover:shadow-m-gold/20 transition-all uppercase tracking-[0.2em] font-bold text-xs mt-6 transform active:scale-95">
                Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 🎨 VIEW 2: DASHBOARD (LUXURY UI)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F5F2ED] font-montserrat flex flex-col md:flex-row">
      
      {/* --- SIDEBAR --- */}
      <aside className="bg-[#2D1B18] text-[#F5F2ED] w-full md:w-72 flex-shrink-0 md:h-screen sticky top-0 z-50 flex flex-col justify-between shadow-2xl border-r border-white/5">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-m-gold rounded-full flex items-center justify-center text-[#2D1B18] font-bold font-serif italic text-xl">M</div>
            <div>
                <h1 className="serif text-xl text-white italic">Admin Panel</h1>
                <p className="text-[9px] uppercase tracking-widest text-white/40">v2.0 Secure</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
              { id: 'products', icon: Package, label: 'Inventory' },
              { id: 'orders', icon: List, label: 'Orders' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setShowForm(false); }} 
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === item.id ? 'bg-gradient-to-r from-m-gold/90 to-m-gold text-[#2D1B18] font-bold shadow-lg' : 'hover:bg-white/5 text-white/60'}`}
              >
                <item.icon size={18} /> 
                <span className="text-xs uppercase tracking-wider">{item.label}</span>
                {activeTab === item.id && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-8">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-300 hover:text-white bg-red-500/10 hover:bg-red-500/50 py-4 rounded-2xl transition-all text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
            <LogOut size={14} /> End Session
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto custom-scrollbar">
        
        {/* --- TAB 1: OVERVIEW STATS --- */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex justify-between items-end border-b border-m-gold/10 pb-6">
                <div>
                    <h2 className="serif text-4xl text-m-brown italic mb-2">Studio Overview</h2>
                    <p className="text-xs uppercase tracking-widest text-m-brown/50">Live Statistics</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-m-gold/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-m-olive">● System Online</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Revenue", val: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "bg-green-100 text-green-700" },
                { label: "Total Orders", val: orders.length, icon: ShoppingBag, color: "bg-blue-100 text-blue-700" },
                { label: "Active Products", val: products.length, icon: Package, color: "bg-purple-100 text-purple-700" },
              ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-50`}><stat.icon size={22}/></div>
                    </div>
                    <p className="serif text-4xl text-m-brown mb-1">{stat.val}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{stat.label}</p>
                  </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- TAB 2: PRODUCTS (ADD/EDIT/DELETE) --- */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-[25px] shadow-sm border border-m-gold/10">
                <div>
                    <h2 className="serif text-3xl text-m-brown italic">Art Collection</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Manage your boutique items</p>
                </div>
                {/* 🔥 THE BUTTON FIX */}
                <button 
                    onClick={openAddForm} // Direct function call
                    className="bg-m-olive text-white px-6 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-m-brown transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                    <Plus size={16}/> Add New Art
                </button>
            </div>

            {/* ADD/EDIT FORM OVERLAY */}
            <AnimatePresence>
                {showForm && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white p-8 rounded-[30px] shadow-2xl border border-m-gold/20 mb-10 relative">
                            <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><X size={20}/></button>
                            
                            <h3 className="serif text-2xl text-m-olive italic mb-8 border-b pb-4 border-gray-100">
                                {editId ? "Edit Masterpiece" : "Upload New Creation"}
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Product Name</label>
                                    <input required type="text" value={productForm.name} className="w-full p-4 bg-[#F9F7F4] border border-m-gold/10 rounded-xl outline-none focus:border-m-olive focus:bg-white transition-all" onChange={(e) => setProductForm({...productForm, name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Price (INR)</label>
                                    <input required type="number" value={productForm.price} className="w-full p-4 bg-[#F9F7F4] border border-m-gold/10 rounded-xl outline-none focus:border-m-olive focus:bg-white transition-all" onChange={(e) => setProductForm({...productForm, price: e.target.value})} />
                                </div>
                                
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Category</label>
                                    <select className="w-full p-4 bg-[#F9F7F4] border border-m-gold/10 rounded-xl outline-none focus:border-m-olive focus:bg-white transition-all" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                                        <option value="Mehendi">Mehendi Product</option>
                                        <option value="Resin">Resin Art</option>
                                        <option value="Jewellery">Jewellery</option>
                                    </select>
                                </div>
                                
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Description</label>
                                    <textarea value={productForm.description} className="w-full p-4 bg-[#F9F7F4] border border-m-gold/10 rounded-xl outline-none h-32 resize-none focus:border-m-olive focus:bg-white transition-all" onChange={(e) => setProductForm({...productForm, description: e.target.value})} />
                                </div>
                                
                                <div className="md:col-span-2 border-2 border-dashed border-m-gold/30 rounded-2xl p-8 text-center hover:bg-m-gold/5 transition-all cursor-pointer relative group">
                                    <input id="fileInput" type="file" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="mx-auto text-m-olive mb-3" size={32} />
                                    </div>
                                    <p className="text-[10px] uppercase font-bold text-m-brown opacity-60 tracking-widest">{file ? file.name : (editId ? "Keep Current Image or Click to Change" : "Click to Upload High-Res Image")}</p>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <button disabled={loading} className={`w-full py-5 rounded-xl font-bold tracking-[0.3em] uppercase text-white shadow-xl transition-all hover:-translate-y-1 ${editId ? 'bg-gradient-to-r from-m-gold to-yellow-600' : 'bg-gradient-to-r from-m-olive to-green-900'}`}>
                                        {loading ? "Processing..." : (editId ? "Update Product" : "Publish to Boutique")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(prod => (
                    <div key={prod._id} className="bg-white p-4 rounded-[30px] border border-m-gold/10 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                        <div className="relative h-56 rounded-[20px] overflow-hidden mb-5">
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            {/* Overlay Buttons */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                <button onClick={() => handleEditClick(prod)} className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-lg"><Edit2 size={18}/></button>
                                <button onClick={() => handleDelete(prod._id)} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg"><Trash2 size={18}/></button>
                            </div>
                        </div>
                        <div className="px-2">
                            <h4 className="font-bold text-m-brown text-lg truncate mb-1">{prod.name}</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-m-olive font-serif font-bold italic text-xl">₹{prod.price}</span>
                                <span className="text-[9px] bg-m-beige px-3 py-1 rounded-full text-m-brown/70 uppercase tracking-widest font-bold">{prod.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* --- TAB 3: ORDERS --- */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
             <h2 className="serif text-4xl text-m-brown italic">Recent Orders</h2>
             <div className="space-y-4">
                {orders.map(order => (
                    <div key={order._id} className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/10 hover:border-m-gold/40 transition-all">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="font-bold text-xl text-m-olive flex items-center gap-2">
                                    {order.customerName}
                                    <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md uppercase tracking-wider">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </h3>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Ref: {order._id.slice(-6)}</p>
                            </div>
                            <div className="mt-2 md:mt-0 text-right">
                                <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${order.paymentMethod === 'UPI_QR' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                    {order.paymentMethod === 'UPI_QR' ? 'Paid via UPI' : 'Cash on Delivery'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 text-sm">
                            <div className="flex-1 space-y-2">
                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Delivery Address</p>
                                <p className="text-m-brown font-medium leading-relaxed">{order.address}</p>
                                <p className="text-m-brown font-bold flex items-center gap-2"><IndianRupee size={14}/> Amount: ₹{order.totalAmount}</p>
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Order Items</p>
                                <ul className="space-y-2">
                                    {order.items.map((item, i) => (
                                        <li key={i} className="flex justify-between border-b border-dashed border-gray-100 pb-1 last:border-0">
                                            <span className="text-m-brown font-medium">{item.name}</span>
                                            <span className="text-gray-400 text-xs">x{item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}