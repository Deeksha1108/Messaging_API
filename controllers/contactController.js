const Contact = require('../models/Contact');
const User = require('../models/User');

exports.sendContactRequest = async (req, res) => {
  if (!req.body || !req.body.receiverId) {
    return res.status(400).json({ msg: 'receiverId is required' });
  }

  const { receiverId } = req.body;

  if (receiverId === req.user._id.toString()) {
    return res.status(400).json({ msg: "You can't send request to yourself" });
  }

  const existing = await Contact.findOne({
    $or: [
      { sender: req.user._id, receiver: receiverId },
      { sender: receiverId, receiver: req.user._id }
    ]
  });

  if (existing) {
    return res.status(400).json({ msg: "Contact request already exists or accepted" });
  }

  const contact = await Contact.create({
    sender: req.user._id,
    receiver: receiverId
  });

  res.status(201).json(contact);
};


exports.acceptContactRequest = async (req, res) => {
  const { senderId } = req.body;

  const contact = await Contact.findOne({
    sender: senderId,
    receiver: req.user._id,
    status: 'pending'
  });

  if (!contact) return res.status(404).json({ msg: 'Contact request not found' });

  contact.status = 'accepted';
  await contact.save();

  res.status(200).json({ msg: 'Contact request accepted' });
};

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find({
    $or: [
      { sender: req.user._id },
      { receiver: req.user._id }
    ],
    status: 'accepted'
  }).populate('sender receiver', 'name email');

  res.status(200).json(contacts);
};
