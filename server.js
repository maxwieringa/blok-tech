const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const mongo = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
const mongodbUri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@bloktech-r4i80.azure.mongodb.net/bamboos-data?retryWrites=true&w=majority';
const ejsLint = require('ejs-lint');
const Schema = mongoose.Schema;
const db = mongoose.connection;

app.set('view engine', 'ejs');
app.set('views', 'view');
app.use(express.static('public'));
app.get('/', matches);
app.get('/:id', profile);
app.get('/add', form);
app.use(notFound)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on('connected', () => {
  console.log('Mongoose connected');
});

function matches(req, res, next) {
  db.collection('profiles').find().toArray(done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('matches.ejs', {
        data: data
      })
    }
  }
}

function profile(req, res, next) {
  var id = req.params.id

  db.collection('profiles').findOne({
    _id: new mongo.ObjectID(id)
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('detail.ejs', {
        data: data
      })
    }
  }
}

function form(req, res) {
  res.render('add.ejs')
}

function add(req, res, next) {
  db.collection('profiles').insertOne({
    naam: req.body.naam,
    leeftijd: req.body.leeftijd,
    bio: req.body.bio
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/' + data.insertedId)
    }
  }
}

//Schema profielen
const ProfielSchema = new Schema({
  naam: String,
  leeftijd: Number,
  bio: String
});

//Model
const Profiel = mongoose.model('Profile', ProfielSchema);

//Saving data to mongo database
const profielData = {
  naam: 'Bruh',
  leeftijd: 22,
  bio: 'Ik ben Bruh en ik hou van de office en avonturen.'
};

const newProfiel = new Profiel(profielData);

newProfiel.save((error) => {
  if (error) {
    console.log('Error newProfiel');
  } else {
    console.log('Data has been saved');
  }
});

function notFound(req, res) {
  res.status(404).render('not-found.ejs')
}