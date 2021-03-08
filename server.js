const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000
const mongo = require('mongodb')
const mongoose = require('mongoose')
const multer = require('multer')
require('dotenv').config()
const mongodbUri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@bloktech-r4i80.azure.mongodb.net/bamboos-data?retryWrites=true&w=majority'
const ejsLint = require('ejs-lint')
const Schema = mongoose.Schema
const db = mongoose.connection
const upload = multer({
  dest: 'public/upload/'
})
let updateId

app.set('view engine', 'ejs')
app.set('views', 'view')
app.use(express.static('public'))
app.get('/', matches)
app.post('/', upload.single('foto'), update)
app.get('/:id/update', updateform)
app.post('/add', upload.single('foto'), add)
app.get('/add', form)
app.get('/:id', profile)
app.delete('/:id', remove)
app.use(function notFound(req, res) {
  res.status(404).render('notfound')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

db.on('connected', () => {
  console.log('Mongoose connected')
})

//Schema voor profielen
const ProfielSchema = new Schema({
  naam: String,
  foto: String,
  leeftijd: Number,
  bio: String
})

//Model van Schema
const Profiel = mongoose.model('Profile', ProfielSchema)

// Gaat opzoek naar alle profielen en zet ze in een array en renderd de ejs pagina
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

// Gaat opzoek naar een profiel en renderd te ejs pagina voor dat profiel
function profile(req, res, next) {
  let id = req.params.id

  Profiel.findOne({
    _id: mongo.ObjectID(id)
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

// Renderd de ejs pagina voor het toevoegen van een profiel
function form(req, res) {
  res.render('add.ejs')
}

// Functie die ervoor zorgt dat een profiel toegevoegd wordt in MongoDB
function add(req, res, next) {
  db.collection('profiles').insertOne({
    naam: req.body.naam,
    foto: req.file ? req.file.filename : null,
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

// Renderd de ejs pagina voor het aanpassen van een profiel
function updateform(req, res, data) {
  res.render('updateform.ejs', {
    data: data
  })
  updateId = req.params.id
  console.log(updateId)
}

// Functie voor het aanpassen van een profiel
function update(req, res, next) {
  Profiel.updateOne({
    _id: mongo.ObjectID(updateId)
  }, {
    $set: {
      naam: req.body.naam,
      foto: req.file ? req.file.filename : null,
      leeftijd: req.body.leeftijd,
      bio: req.body.bio
    }
  }, {
    multi: false
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  }
}

// Functie voor het verwijderen van profielen, unmatchen zoals het in de app heet
function remove(req, res, next) {
  let id = req.params.id

  Profiel.deleteOne({
    _id: mongo.ObjectID(id)
  }, done)

  function done(err) {
    if (err) {
      next(err)
    } else {
      res.json({
        status: 'ok'
      })
    }
  }
}