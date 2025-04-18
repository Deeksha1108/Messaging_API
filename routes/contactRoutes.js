const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  sendContactRequest,
  acceptContactRequest,
  getContacts
} = require('../controllers/contactController');

router.post('/request', auth, sendContactRequest);
router.post('/accept', auth, acceptContactRequest);
router.get('/', auth, getContacts);

module.exports = router;
