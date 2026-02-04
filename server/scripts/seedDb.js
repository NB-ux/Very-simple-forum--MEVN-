const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Existing data cleared');

    // Optional: Add sample data
    const sampleUsers = [
      {
        email: 'user1@example.com',
        username: 'user1',
        password: 'hashedpassword1', // In production, hash this
        confirmed: true,
        confirmationToken: null,
      },
      {
        email: 'user2@example.com',
        username: 'user2',
        password: 'hashedpassword2',
        confirmed: true,
        confirmationToken: null,
      },
    ];

    const samplePosts = [
      {
        title: 'Welcome to the forum',
        content: 'This is the first post on our forum. Feel free to share your thoughts!',
      },
      {
        title: 'Getting started',
        content: 'Here are some tips to get started with this forum platform.',
      },
    ];

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
