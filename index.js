const express = require('express')
const morgan =require('morgan')
const session = require('express-session')
const cors = require('cors')
const fs = require('fs')
const http = require('http')
const https = require('https')

const app = express();

app.use(cors({}))

app.use(morgan('dev'))

const options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/cert.pem')
}

http.createServer(app).listen(80, () => {
    console.log('server on 80')
})
https.createServer(options, app).listen(8000, () => {
    console.log('server on 8000')
})

app.get('/', function(req,res){
    res.send('hellow world')})