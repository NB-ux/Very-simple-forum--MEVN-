const express = require('express');
const postRoute = express.Router();
const postcontroller = require('../controllers/postController')

let PostModel = require('../models/Post');

const util = require('util')
let promisepost = util.promisify(PostModel.create);

//get all posts
postRoute.route('/').get((req, res, next) => {
    PostModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//create post
/*
postRoute.route('/create-post').post((req, res, next) => {
    PostModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})
*/
postRoute.route('/create-post').post((req, res, next) => {
    const data = req.body;
    var newData = new PostModel();
    newData.title = data.title;
    newData.content = data.content;
    console.log(req.body);
    console.log(res);
    console.log(newData.title);
    console.log(newData.content);
    console.log(data.title);
    console.log(data.content);
    PostModel.create({ newData })
    .then(result => res.json(data))
    .catch(kaj => console.log("kajahtaa"));
})

/*
postRoute.route('/create-post').post((req, res, next) => {
    PostModel.create().then( function (req) {
        console.log(req);
    })
    .catch(function (error){
        console.log(error)
    })
})
*/
//postRoute.route('/create-post').post(postcontroller.createPostController);

//delete post
postRoute.route('/delete-post/:id').delete((req, res, next) => {
    PostModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ msg: data })
        }
    })
})

module.exports = postRoute;