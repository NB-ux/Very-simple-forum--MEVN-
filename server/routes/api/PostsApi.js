const {Router} = require ('express')
const Post = require('../../models/Post')
//const { authenticateToken } = require('../../middleware/authMiddleware')
const { verifyToken } = require('./UsersApi')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.status(200).json(posts); // Send the posts as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

router.post('/', verifyToken, async (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
    })

    try {
      const post = await newPost.save()
      if (!post) throw new Error('Something went wrong saving the post')
        res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    const {id} = req.params
    try {
        const removed = await Post.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/myPosts', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id }); // Fetch posts created by the authenticated user
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

