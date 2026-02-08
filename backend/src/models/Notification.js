const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  type: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);