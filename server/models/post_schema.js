const {Schema, model} = require('mongoose');

const postSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'content field is required'],
        },
        author: {
            type: String,
            required: [true, 'author field is required'],
        },
    },
    {timestamps: true},
);

module.exports = model('posts', postSchema);