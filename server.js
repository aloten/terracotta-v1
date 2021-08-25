const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const morgan = require('morgan');

//Connect Database
connectDB();

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

// HTTP request logger
app.use(morgan('tiny'));

// Define routes
app.use('/api/register', require('./routes/register'));
app.use('/api/bottles', require('./routes/bottles.js'));
app.use('/api/login', require('./routes/login.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
