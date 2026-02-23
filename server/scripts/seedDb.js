const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

    // Add sample data
    const sampleUsers = [
      {
        email: 'user1@example.com',
        username: 'user1',
        password: 'hashedpassword1', 
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



    // Hash passwords then insert sample data
    console.log('Hashing and inserting sample users...');
    const usersToInsert = await Promise.all(sampleUsers.map(async (u) => ({
      email: u.email,
      username: u.username,
      password: await bcrypt.hash(u.password, 10),
      confirmed: u.confirmed || false,
      confirmationToken: null
    })));
    const createdUsers = await User.insertMany(usersToInsert);
    console.log(`Inserted ${createdUsers.length} users`);

    const samplePosts = [
        {
          title: 'Welcome to the forum',
          content: 'This is the first post on our forum. Feel free to share your thoughts!',
          userId: createdUsers[1]._id,
          createdAt: new Date(),
        },
        {
          title: 'Getting started',
          content: 'Here are some tips to get started with this forum platform.',
          userId: createdUsers[0]._id,
          createdAt: new Date(),
        },
    ];

    console.log('Inserting sample posts...');
    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`Inserted ${createdPosts.length} posts`);

    console.log('Database seeding completed! Disconnecting...');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
