const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const gearRoutes = require('./routes/gearRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
dotenv.config();

// Define snipcartApiKey
const snipcartApiKey = process.env.SNIPCART_API_KEY;

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
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRoutes);
app.use('/event', eventRoutes);
app.use('/gear', gearRoutes);

const PORT = process.env.PORT || 3309;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
