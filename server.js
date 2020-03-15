const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mongo = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
const mongodbUri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@bloktech-r4i80.azure.mongodb.net/bamboos-data?retryWrites=true&w=majority';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

//Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now()
  }
});

//Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//Saving data to mongo database
/* const data = {
  title: 'Bruhmoment',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};

const newBlogPost = new BlogPost(data);

newBlogPost.save((error) => {
  if (error) {
    console.log('Error newBlogPost');
  } else {
    console.log('Data has been saved');
  }
}); */

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/about', (req, res) => res.send('bruhmoment'));
app.get('/contact', (req, res) => res.send('Bruh'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));