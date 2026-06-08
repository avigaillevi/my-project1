import mongoose from 'mongoose';
 
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  weight: { type: Number, required: true },
  img: { type: String, required: true }
});
 
export default mongoose.model('Product', productSchema);