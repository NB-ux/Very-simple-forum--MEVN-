const {Router} = require ('express')
const Post = require('../../models/Post')


const router = Router()

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

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const removed = await Post.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;

