const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const messageLimiter = require('../middlewares/rateLimiter'); 
const { sendMessage, getMessages } = require('../controllers/messageController');

router.post('/', auth, messageLimiter, sendMessage);
router.get('/:contactId', auth, getMessages);

module.exports = router;
