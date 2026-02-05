import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Package, List, Upload, Trash2, Edit2, 
  LayoutDashboard, IndianRupee, ShoppingBag, X, Search, ChevronRight 
} from 'lucide-react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });
  
  // --- DATA STATES ---
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'orders'
  
  // --- FORM & EDITING STATES ---
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // Agar ye ID hai, matlab EDIT mode on hai
  const [showForm, setShowForm] = useState(false); // Mobile/Desktop form toggle
  
  const [productForm, setProductForm] = useState({ 
    name: '', price: '', category: 'Mehendi', description: '' 
  });
  const [file, setFile] = useState(null);

  // ✅ LIVE BACKEND URL
  const BACKEND_URL = "https://mariyam-mehendi.onrender.com"; 

  // --- 1. LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    if(user.username === "mariyam04" && user.password === "mehendi@2026") setIsLoggedIn(true);
    else alert("Access Denied! Wrong Credentials.");
  };

  // --- 2. DATA FETCHING ---
  const fetchData = async () => {
    try {
      const ordersRes = await axios.get(`${BACKEND_URL}/api/orders/all`);
      const productsRes = await axios.get(`${BACKEND_URL}/api/products/all`);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (err) { console.error("Data Load Error", err); }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  // --- 3. DELETE PRODUCT ---
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this art piece permanently?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/products/delete/${id}`);
      alert("Product Deleted Successfully");
      fetchData(); // List refresh karo
    } catch(err) { alert("Delete Failed"); }
  };

  // --- 4. PREPARE EDIT ---
  const handleEditClick = (prod) => {
    setEditId(prod._id);
    setProductForm({
      name: prod.name,
      price: prod.price,
      category: prod.category,
      description: prod.description
    });
    setShowForm(true); // Form open karo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 5. RESET FORM ---
  const resetForm = () => {
    setEditId(null);
    setProductForm({ name: '', price: '', category: 'Mehendi', description: '' });
    setFile(null);
    setShowForm(false);
    if(document.getElementById('fileInput')) document.getElementById('fileInput').value = "";
  };

  // --- 6. SUBMIT (ADD or UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(productForm).forEach(key => formData.append(key, productForm[key]));
    if (file) formData.append('image', file);

    try {
      if (editId) {
        // UPDATE Existing
        await axios.put(`${BACKEND_URL}/api/products/update/${editId}`, formData);
        alert("✨ Product Updated Successfully!");
      } else {
        // ADD New
        await axios.post(`${BACKEND_URL}/api/products/add`, formData);
        alert("🎉 New Art Added to Boutique!");
      }
      
      resetForm();
      fetchData();
    } catch (err) { 
      console.error(err);
      alert("Operation Failed! Check Console."); 
    } finally { 
      setLoading(false); 
    }
  };

  // --- STATS CALCULATION ---
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  // --- VIEW: LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5F2ED] px-6 font-montserrat relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-m-gold/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-m-olive/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-xl p-10 shadow-2xl rounded-[40px] w-full max-w-md border border-white/50 relative z-10">
          <div className="text-center mb-8">
            <h2 className="serif text-4xl text-m-olive italic mb-2">Studio Access</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-m-brown/60">Restricted Area</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group">
                <input type="text" placeholder="Username" className="w-full p-4 bg-white border border-m-gold/20 rounded-xl outline-none focus:border-m-olive focus:ring-1 focus:ring-m-olive transition-all" onChange={(e) => setUser({...user, username: e.target.value})} />
            </div>
            <div className="group">
                <input type="password" placeholder="Password" className="w-full p-4 bg-white border border-m-gold/20 rounded-xl outline-none focus:border-m-olive focus:ring-1 focus:ring-m-olive transition-all" onChange={(e) => setUser({...user, password: e.target.value})} />
            </div>
            <button className="w-full bg-m-brown text-white py-4 rounded-xl shadow-lg hover:bg-m-olive transition-all uppercase tracking-[0.2em] font-bold text-xs mt-4">Login Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- VIEW: DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#F5F2ED] font-montserrat flex flex-col md:flex-row">
      
      {/* --- SIDEBAR --- */}
      <aside className="bg-[#2D1B18] text-[#F5F2ED] w-full md:w-72 flex-shrink-0 md:h-screen sticky top-0 z-50 flex flex-col justify-between shadow-2xl">
        <div className="p-8">
          <h1 className="serif text-3xl text-m-gold italic mb-12">Mariyam Admin</h1>
          <nav className="space-y-3">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
              { id: 'products', icon: Package, label: 'Products' },
              { id: 'orders', icon: List, label: 'Orders' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === item.id ? 'bg-m-gold text-m-brown font-bold shadow-lg' : 'hover:bg-white/5 text-white/70'}`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'text-m-brown' : 'text-m-gold'} /> 
                <span className="text-sm tracking-wide">{item.label}</span>
                {item.id === 'orders' && <span className="ml-auto bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full">{orders.length}</span>}
                {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-8">
          <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center justify-center gap-2 text-red-300 hover:text-red-100 bg-red-500/10 hover:bg-red-500/20 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest border border-red-500/20">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto custom-scrollbar">
        
        {/* --- TAB 1: OVERVIEW STATS --- */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="serif text-4xl text-m-olive italic mb-2">Welcome Back, Mariyam</h2>
                    <p className="text-sm text-m-brown/60">Here is what’s happening in your studio today.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xs font-bold uppercase tracking-widest text-m-gold">{new Date().toDateString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stat Card 1 */}
              <div className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/20 flex flex-col justify-between h-40 group hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-green-50 rounded-full text-green-600"><IndianRupee size={24}/></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Revenue</span>
                </div>
                <p className="serif text-4xl text-m-brown">₹{totalRevenue.toLocaleString()}</p>
              </div>
              {/* Stat Card 2 */}
              <div className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/20 flex flex-col justify-between h-40 group hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600"><ShoppingBag size={24}/></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Orders</span>
                </div>
                <p className="serif text-4xl text-m-brown">{orders.length}</p>
              </div>
              {/* Stat Card 3 */}
              <div className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/20 flex flex-col justify-between h-40 group hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-purple-50 rounded-full text-purple-600"><Package size={24}/></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Products</span>
                </div>
                <p className="serif text-4xl text-m-brown">{products.length}</p>
              </div>
            </div>
            
            {/* Recent Activity Mini Table */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-m-gold/10">
                <h3 className="serif text-2xl text-m-brown italic mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {orders.slice(0, 3).map(order => (
                        <div key={order._id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-m-gold/10 flex items-center justify-center text-m-gold font-bold">
                                    {order.customerName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-m-brown">{order.customerName}</p>
                                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <span className="font-bold text-m-olive">+ ₹{order.totalAmount}</span>
                        </div>
                    ))}
                </div>
            </div>
          </motion.div>
        )}

        {/* --- TAB 2: PRODUCTS (ADD/EDIT/DELETE) --- */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="serif text-4xl text-m-brown italic">Inventory</h2>
                <button onClick={() => { setShowForm(!showForm); resetForm(); }} className="bg-m-olive text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-m-brown transition-all shadow-lg flex items-center gap-2">
                    {showForm ? <X size={16}/> : <Upload size={16}/>} {showForm ? "Close Form" : "Add New Art"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Product Form (Collapsible) */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:col-span-12 overflow-hidden"
                        >
                            <div className="bg-white p-8 rounded-[30px] shadow-xl border border-m-gold/20 mb-8">
                                <h3 className="serif text-2xl text-m-olive italic mb-6 border-b pb-4 border-gray-100">
                                    {editId ? "Edit Masterpiece" : "New Creation Details"}
                                </h3>
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input required type="text" placeholder="Product Name" value={productForm.name} className="w-full p-4 bg-[#F9F7F4] border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" onChange={(e) => setProductForm({...productForm, name: e.target.value})} />
                                    <input required type="number" placeholder="Price (₹)" value={productForm.price} className="w-full p-4 bg-[#F9F7F4] border border-m-gold/20 rounded-xl outline-none focus:border-m-olive" onChange={(e) => setProductForm({...productForm, price: e.target.value})} />
                                    
                                    <div className="md:col-span-2">
                                        <select className="w-full p-4 bg-[#F9F7F4] border border-m-gold/20 rounded-xl outline-none" value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})}>
                                            <option value="Mehendi">Mehendi Product</option>
                                            <option value="Resin">Resin Art</option>
                                            <option value="Jewellery">Jewellery</option>
                                        </select>
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <textarea placeholder="Description..." value={productForm.description} className="w-full p-4 bg-[#F9F7F4] border border-m-gold/20 rounded-xl outline-none h-32 resize-none" onChange={(e) => setProductForm({...productForm, description: e.target.value})} />
                                    </div>
                                    
                                    <div className="md:col-span-2 border-2 border-dashed border-m-gold/30 rounded-2xl p-6 text-center hover:bg-[#F9F7F4] cursor-pointer relative">
                                        <input id="fileInput" type="file" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        <Upload className="mx-auto text-m-olive mb-2" size={24} />
                                        <p className="text-[10px] uppercase font-bold text-m-brown opacity-60 tracking-widest">{file ? file.name : (editId ? "Change Image (Optional)" : "Select High-Res Image")}</p>
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <button disabled={loading} className={`w-full py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-white shadow-lg transition-all ${editId ? 'bg-m-gold hover:bg-m-brown' : 'bg-m-brown hover:bg-m-olive'}`}>
                                            {loading ? "Processing..." : (editId ? "Update Product" : "Publish to Store")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Product Grid */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(prod => (
                        <div key={prod._id} className="bg-white p-4 rounded-[25px] border border-m-gold/10 shadow-sm hover:shadow-xl transition-all group">
                            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEditClick(prod)} className="bg-white/90 p-2 rounded-full text-blue-600 hover:bg-blue-50 shadow-sm"><Edit2 size={16}/></button>
                                    <button onClick={() => handleDelete(prod._id)} className="bg-white/90 p-2 rounded-full text-red-600 hover:bg-red-50 shadow-sm"><Trash2 size={16}/></button>
                                </div>
                            </div>
                            <h4 className="font-bold text-m-brown text-lg truncate">{prod.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-m-olive font-serif font-bold italic">₹{prod.price}</span>
                                <span className="text-[9px] bg-m-beige px-2 py-1 rounded-full text-m-brown/60 uppercase tracking-wider border border-m-gold/20">{prod.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </motion.div>
        )}

        {/* --- TAB 3: ORDERS --- */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
             <h2 className="serif text-4xl text-m-brown italic">Order History</h2>
             <div className="space-y-4">
                {orders.map(order => (
                    <div key={order._id} className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-m-gold/10 hover:border-m-gold/30 transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h3 className="font-bold text-xl text-m-olive flex items-center gap-2">
                                    {order.customerName}
                                    <span className="text-[10px] bg-m-beige text-m-brown px-2 py-1 rounded-full border border-m-gold/20 font-normal uppercase tracking-wider">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </h3>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Order ID: {order._id.slice(-6)}</p>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${order.paymentMethod === 'UPI_QR' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                    {order.paymentMethod === 'UPI_QR' ? 'Paid Online' : 'Cash on Delivery'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Shipping To</p>
                                <p className="text-m-brown font-medium leading-relaxed">{order.address}</p>
                                <p className="font-bold text-m-olive flex items-center gap-2"><IndianRupee size={14}/> Total: ₹{order.totalAmount}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Items</p>
                                <ul className="space-y-2">
                                    {order.items.map((item, i) => (
                                        <li key={i} className="flex items-center justify-between border-b border-dashed border-gray-100 pb-1">
                                            <span className="text-m-brown">{item.name}</span>
                                            <span className="text-gray-400 text-xs">x{item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[30px] border border-dashed border-m-gold/30">
                        <ShoppingBag className="mx-auto text-m-gold mb-4 opacity-50" size={48} />
                        <p className="serif text-xl text-m-brown/50 italic">No orders yet.</p>
                    </div>
                )}
             </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}