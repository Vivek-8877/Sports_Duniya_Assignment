const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/vendors', require('./routes/vendor'));
app.use('/api/purchase-orders', require('./routes/purchaseOrder'));

module.exports = app;
