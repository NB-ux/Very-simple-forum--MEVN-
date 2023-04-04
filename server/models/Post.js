const mongos = require('mongoose');
const Schema = mongos.Schema;

let postSchema = new Schema({
    title:{
        type: String
    },
    content:{
        type: String
    }
})

module.exports = mongos.model('Post', postSchema)