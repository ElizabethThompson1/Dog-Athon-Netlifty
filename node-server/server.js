const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const gearRoutes = require('./routes/gearRoutes');
const cartRoutes = require('./routes/cart');
const stripeRoutes = require('./routes/stripeRoutes');


const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
dotenv.config();

// Define snipcartApiKey
const snipcartApiKey = process.env.SNIPCART_API_KEY;
const apiUrl = process.env.REACT_APP_API_BASE_URL;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Initialize Express app
const app = express();
app.use(bodyParser.json());

const allowedOrigins = [
  process.env.SANITY_STUDIO_URL,     // Your Sanity studio URL
  process.env.SERVER_URL,            // Your server URL
  process.env.STRIPE_URL             // Your Stripe URL (if applicable)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRoutes);
app.use('/event', eventRoutes);
app.use('/gear', gearRoutes);
app.use('/cart', cartRoutes);
app.use('/stripe', stripeRoutes);

const PORT = process.env.PORT || 3309;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
