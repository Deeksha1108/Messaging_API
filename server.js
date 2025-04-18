const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const logger = require('./utils/logger');

dotenv.config();
connectDB();

app.use(express.json());

app.use("/contacts", require("./routes/contactRoutes"));
app.use("/messages", require("./routes/messageRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
