const mongos = require('mongoose');
const Schema = mongos.Schema;

let postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

module.exports = mongos.model('Post', postSchema)