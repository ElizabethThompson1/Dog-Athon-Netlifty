const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create the Sanity client instance
const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: false,
  token: process.env.TOKEN,
  apiVersion: "2022-02-03"
});

const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;
    const profileImage = req.file; 

    if (!profileImage) {
      return res.status(400).json({ error: 'Profile image is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadedImage = await client.assets.upload('image', profileImage.buffer, { 
      filename: profileImage.originalname,
      contentType: profileImage.mimetype
    });

    const newUser = await client.create({
      _type: 'user',
      fullName,
      email,
      password: hashedPassword,
      isAdmin: false,
      profileImage: {
        _type: 'image',
        asset: {
          _ref: uploadedImage._id,
          _type: 'reference',
        },
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user from the Sanity database
    const query = `*[_type == "user" && email == $email][0]{
      _id,
      fullName,
      email,
      password,
      isAdmin,
    }`;
    const params = { email };
    const user = await client.fetch(query, params);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '24h' });

    // Prepare user data to send back, excluding the hashed password
    const userData = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    // Send the token and user data back to the client
    res.status(200).send({ token, user: userData });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ message: 'Failed to log in' });
  }
};


const getUserByEmail = async (req, res) => {
  const { email } = req.params; // Extract the email from URL parameters

  try {
    const query = `*[_type == "user" && email == $email][0]{
      _id,
      fullName,
      email,
      isAdmin,
      "profileImageUrl": profileImage.asset->url  // Assuming you store images in Sanity
    }`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).send({ message: 'Failed to fetch user' });
  }
};


// Function to get user data by userId
const getUser = async (userId) => {
  try {
    const user = await client.getDocument(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.profileImage) {
      user.profileImage = await client.getDocument(user.profileImage.asset._ref);
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};

// Function to delete a user by userId
const deleteUser = async (userId) => {
  try {
    await client.delete(userId);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  getUserByEmail
};
