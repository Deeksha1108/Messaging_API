const Message = require('../models/Message');
const Contact = require('../models/Contact');

exports.sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;

  const isContact = await Contact.findOne({
    $or: [
      { sender: req.user._id, receiver: receiverId },
      { sender: receiverId, receiver: req.user._id }
    ],
    status: 'accepted'
  });

  if (!isContact) return res.status(403).json({ msg: 'Not allowed to message' });

  const msg = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    message
  });

  res.status(201).json(msg);
};

exports.getMessages = async (req, res) => {
  const { contactId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: contactId },
      { sender: contactId, receiver: req.user._id }
    ]
  })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(messages);
};

