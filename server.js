const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
// const morgan = require('morgan');
const path = require('path');

//Connect Database
connectDB();

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

// HTTP request logger
// app.use(morgan('tiny'));

// Define routes
app.use('/api/register', require('./routes/register'));
app.use('/api/bottles', require('./routes/bottles.js'));
app.use('/api/login', require('./routes/login.js'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
