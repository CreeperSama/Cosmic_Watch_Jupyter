const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. REGISTRATION (SIGN UP)
exports.signup = async (req, res) => {
  try {
    // Extract new fields from the frontend form
    const { name, email, password, role, affiliation } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user with ROLE and AFFILIATION
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'enthusiast', // Default to enthusiast if not sent
      affiliation: affiliation || 'Independent Observer'
    });

    // Generate Token immediately so they are logged in
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role }, 
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    // Send back the user data (excluding password)
    res.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        affiliation: newUser.affiliation
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. LOGIN (Already exists, but ensuring it returns full user data)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        affiliation: user.affiliation
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};