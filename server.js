const express = require('express')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/user', (req, res) => res.send('bruhmoment'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))