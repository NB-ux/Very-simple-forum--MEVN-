const express = require('express');
const path = require('path');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.post('/', async (req, res) => {

    const newPost = new Post(req.body)
    try {
      const post = await newPost.save()
      if (!post) throw new Error('Something went wrong saving the post')
        res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
})
module.exports = router;
