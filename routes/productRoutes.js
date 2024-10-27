import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Add a new product
router.post('/', async (req, res) => {
  const { name, price, description, stock, category, imageUrl } = req.body; // Include imageUrl

  try {
    const newProduct = new Product({ name, price, description, stock, category, imageUrl }); // Add imageUrl here
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(400).json({ error: 'Error adding product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching products' });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching product' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  const { name, price, description, stock, category, imageUrl } = req.body; // Include imageUrl

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      name, price, description, stock, category, imageUrl // Add imageUrl here
    }, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(400).json({ error: 'Error updating product' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting product' });
  }
});

export default router;
