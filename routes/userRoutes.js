import express from 'express';
import User from '../models/User.js'; // User model
import Cart from '../models/Cart.js'; // Cart model

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            first_name,
            last_name,
            email,
            password, // Save the plain password (consider hashing in production)
        });

        await newUser.save();

        // Automatically create a cart for the new user
        const newCart = new Cart({ user: newUser._id, items: [], totalPrice: 0 });
        await newCart.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ error: 'Error registering user' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare plain password directly (consider using a password hashing method)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the user already has a cart, create one if not
        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            cart = new Cart({ user: user._id, items: [], totalPrice: 0 });
            await cart.save();
        }

        res.status(200).json({ message: 'Login successful', user, cart });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(400).json({ error: 'Error fetching user' });
    }
});

export default router; // Ensure this exports the router
