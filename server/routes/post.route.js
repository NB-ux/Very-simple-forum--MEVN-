const express = require('express');
const postRoute = express.Router();

let PostModel = require('../models/Post');

//get all posts
postRoute.route('/').get((req, res, next) =>{
    PostModel.find((error, data) =>{
        if(error){
            return next(error);
        } else{
            res.json(data);
        }
    })
})

//create post
postRoute.route('/create-post').post((req, res, next) =>{
    PostModel.create(req.body, (error, data) => {
        if(error){
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//delete post
postRoute.route('/delete-post/:id').delete((req, res, next) => {
    PostModel.findByIdAndDelete(req.params.id, (error, data) => {
        if(error){
            return next(error);
        } else{
            res.status(200).json({msg: data})
        }
    })
})