import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: { type: Array, required: true },
  status: { type: String, default: 'Pending' } // Pending, Shipped, Delivered
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;