// const express = require('express');
// const router = express.Router();
// const Notification = require('../models/Notification');

// router.get('/', async (req, res) => {
//   const alerts = await Notification.find().sort({ timestamp: -1 }).limit(10);
//   res.json(alerts);
// });

// router.put('/read-all', async (req, res) => {
//   await Notification.updateMany({ isRead: false }, { isRead: true });
//   res.json({ success: true });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMIddleware'); // <--- 1. Import Middleware
const Notification = require('../models/Notification');

// @route   GET /notifications
// @desc    Get all active alerts
// @access  Private (Logged in users only)
router.get('/', auth, async (req, res) => { // <--- 2. Add 'auth' here
  try {
    const alerts = await Notification.find().sort({ timestamp: -1 }).limit(10);
    res.json(alerts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /notifications/read-all
// @desc    Mark all alerts as read
// @access  Private
router.put('/read-all', auth, async (req, res) => { // <--- 3. Add 'auth' here
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;