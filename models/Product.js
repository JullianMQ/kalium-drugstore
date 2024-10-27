import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: { // Add imageUrl field
    type: String,
    required: true // Adjust based on your needs; set to false if not required
  }
});

export default mongoose.model('Product', ProductSchema);
