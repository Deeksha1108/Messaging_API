const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const app = express();


dotenv.config();
connectDB();

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/contacts', require('./routes/contactRoutes'));
app.use('/messages', require('./routes/messageRoutes'));
app.use('/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
