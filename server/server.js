// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const postapi = require('./routes/api/PostsApi')
const userapi = require('./routes/api/UsersApi');

// parse env variables
require('dotenv').config();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());

//mongoose connection to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB database connected'))
.catch((error) => console.log(error))

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
//app.use('/api', require('./routes/api'));
//app.use('/api/posters', require('./routes/post.route'))
app.use('/api', postapi, userapi);
// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
