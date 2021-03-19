const express = require('express')
const morgan =require('morgan')
const session = require('express-session')
const bodyParser = require("body-parser");
const cors = require('cors')
const fs = require('fs')
const http = require('http')
const https = require('https')
const controller = require("./controllers");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//const options = {
//    ca: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/fullchain.pem'),
//    key: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/privkey.pem'),
//    cert: fs.readFileSync('/etc/letsencrypt/live/simpletask.ga/cert.pem')
//}

app.get('/contents', controller.contentsController)  // 컨텐츠 정보 얻기 / 필요 x / 컨텐츠 정보
app.get('/user', controller.userController)  // 유저 정보 얻기 / 유저이름 / 유저의 정보, 친구가 있다면 친구(관심)
app.post('/create', controller.createController)  // 컨텐츠 생성 / 타이틀, 텍스트, 유저아이디 / ok 메시지
app.post('/signin', controller.signInController)  // 로그인 / 이메일, 패스워드 / ok 메시지
app.post('/signout', controller.signOutController)  // 로그아웃 / 일단은 냅뒀지만 토큰 삭제
app.post('/signup', controller.signUpController)  // 등록 / 이름, 이메일, 패스워드, 닉네임 / ok 메시지
app.post('/edit', controller.editController)  // 글 수정 / 게시글 id, 텍스트(수정한), 제목(수정한) / ok 메시지
app.post('/editpw', controller.editpwController)  // 비밀번호 수정 / 이메일, 패스워드 / ok 메시지
app.post('/delete', controller.deleteController)  // 글 삭제 / 게시글 id / ok 메시지
app.post('/deleteid', controller.deleteidController)  // 아이디 삭제 / 이메일 / ok 메시지
app.post('/addfriend', controller.addfriendController)  // 친구(관심) 추가 / 친구 이름 / ok 메시지

// app.get("/accesstokenrequest", controller.accessTokenRequest);
// app.get("/refreshtokenrequest", controller.refreshTokenRequest);

http.createServer(app).listen(3000, () => {
    console.log('server on 3000')
})
//https.createServer(options, app).listen(8000, () => {
//    console.log('server on 8000')
//})

app.get('/', function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.send('hellow world')})