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
    console.log("Product ID not provided in request body.");
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    // Fetch the user's cart and populate items
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    if (!cart) {
      console.log("Cart not found for user:", req.params.userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the product exists in the cart
    console.log("Cart items:", cart.items.map(item => item.product.toString()));
    console.log("Requested Product ID:", productId);

    const itemIndex = cart.items.findIndex(item => item.product && item.product._id.toString() === productId);
    if (itemIndex === -1) {
      console.log("Product not found in cart items for ID:", productId);
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Product found in cart
    const item = cart.items[itemIndex];

    // Fetch the product from the Product collection to verify price
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Product not found in database:", productId);
      return res.status(404).json({ message: 'Product not found' });
    }

    // Adjust total price and remove the item from the cart
    cart.totalPrice -= item.quantity * product.price;
    console.log("Updated Total Price:", cart.totalPrice);

    cart.items.splice(itemIndex, 1); // Remove item from cart

    // Save the updated cart
    await cart.save();
    console.log("Item removed successfully from cart. Updated Cart:", cart);

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (err) {
    console.error("Error during cart item removal:", err);
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});


export default router; // Ensure this exports the router
