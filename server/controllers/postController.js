const PostModel = require('../models/Post');
var userService = require('../postService');

var createPostController = async (req, res) => {
    var status = await userService.createPostDBService(req.body);
    if(status){
        res.send({"status": true, "title": "titleä", "content": "contetnttia"})
    }
    else{
        res.send({"status": false})
    }
}

module.exports = {createPostController};