// Importing required modules
const cors = require("cors");
const express = require("express");

//MongoDb Connection string

require('dotenv').config({ path: '.env' });

require("./helpers/db/mongodb.js")();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  process.env.DB_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// parse env variables
require("dotenv").config();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());

app.set("view engine", "html");

// Static folder
app.use(express.static(__dirname + "/views/"));

// Defining route middleware
app.use("/api", require("./routes/api"));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
