const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Dummy user for example
const user = { username: 'admin', password: bcrypt.hashSync('admin', 8) };

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && bcrypt.compareSync(password, user.password)) {
    // Create JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;