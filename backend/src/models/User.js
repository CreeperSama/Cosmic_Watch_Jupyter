const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // New Fields Required for the Problem Statement
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['researcher', 'enthusiast'], // Restricts input to these two options
    default: 'enthusiast' 
  },
  affiliation: { 
    type: String, 
    default: 'Independent Observer' // e.g., "NASA", "SpaceX" or "Home"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);