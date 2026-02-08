const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/', async (req, res) => {
  const alerts = await Notification.find().sort({ timestamp: -1 }).limit(10);
  res.json(alerts);
});

router.put('/read-all', async (req, res) => {
  await Notification.updateMany({ isRead: false }, { isRead: true });
  res.json({ success: true });
});

module.exports = router;