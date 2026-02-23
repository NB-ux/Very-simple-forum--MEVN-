const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// REGISTER route
router.post('/register', async (req, res) => {
  console.log("Register route called");
  const { email, username, password } = req.body;
  try {
    // Check if user or email exists
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email or username already taken" });
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Create confirmation token
    const confirmationToken = jwt.sign({ email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    // Save user (not confirmed yet)
    const user = new User({ email, username, password: hashed, confirmationToken, confirmed: false });
    await user.save();

    // Send confirmation email
    const confirmUrl = `http://localhost:3001/api/confirm/${confirmationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirm your registration",
      html: `<p>Click <a href="${confirmUrl}">here</a> to confirm your registration.</p>`
    });

    res.json({ success: true, message: "Registration successful! Please check your email to confirm your account." });
  } catch (err) {
    console.log("penis");
    console.error(err.message);
    if (err.stack) console.error('Stack trace:', err.stack);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// EMAIL CONFIRMATION route
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findOne({ email: decoded.email, confirmationToken: token });
    if (!user) return res.status(400).send("Invalid confirmation link.");
    user.confirmed = true;
    user.confirmationToken = undefined;
    await user.save();
    res.send("Email confirmed! You can now log in.");
  } catch (err) {
    res.status(400).send("Invalid or expired confirmation link.");
  }
});

// LOGIN route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PROFILE route (protected)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
module.exports.verifyToken = verifyToken;