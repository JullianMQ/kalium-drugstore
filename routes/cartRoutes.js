// Importing required modules
import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware for validation
const validateAddToCart = (req, res, next) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product ID or quantity' });
  }
  next();
};

// Add item to cart
router.post('/:userId/add', validateAddToCart, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [], totalPrice: 0 });
    }

    // Check if product is already in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity; // Increase quantity if already exists
    } else {
      cart.items.push({ product: productId, quantity }); // Add new item to cart
    }

    // Update total price
    cart.totalPrice += product.price * quantity;

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

router.put('/:userId/subtract', validateAddToCart, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [], totalPrice: 0 });
    }

    // Check if product is already in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity -= quantity; // Increase quantity if already exists
    } else {
      cart.items.push({ product: productId, quantity }); // Add new item to cart
    }

    // Update total price
    cart.totalPrice += product.price * quantity;

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});


// Get cart for a user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found', items: [] }); // Return empty items array
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

// Remove an item from the cart
router.delete('/:userId/remove', async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const item = cart.items[itemIndex];
    const product = await Product.findById(productId); // Fetch product to get the price
    cart.totalPrice -= item.quantity * product.price; // Adjust total price

    cart.items.splice(itemIndex, 1); // Remove item from cart

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});

export default router; // Ensure this exports the router
