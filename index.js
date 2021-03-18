const express = require('express')
const morgan =require('morgan')
const session = require('express-session')
const bodyParser = require("body-parser");
const cors = require('cors')
const fs = require('fs')
const http = require('http')
const https = require('https')
const controller = require("./controllers");
const controllers = require('./controllers');

const app = express();

app.use(cors({}))

app.use(morgan('dev'))

app.use(bodyParser.json())

//const options = {
//    ca: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/fullchain.pem'),
//    key: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/privkey.pem'),
//    cert: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/cert.pem')
//}

app.get('/user', controller.contentsController)
app.post('/create', controller.createController)
app.post('/signin', controller.signInController)
app.post('/signout', controller.signOutController)
app.post('/signup', controller.signUpController)
app.post('/edit', controller.editController)
app.post('/editpw', controller.editpwController)
app.post('/delete', controller.deleteController)
app.post('/deleteid', controller.deleteidController)

http.createServer(app).listen(80, () => {
    console.log('server on 80')
})
//https.createServer(options, app).listen(8000, () => {
//    console.log('server on 8000')
//})

app.get('/', function(req,res){
    res.send('hellow world')})