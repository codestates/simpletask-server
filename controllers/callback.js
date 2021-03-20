const clientID = '0b10ccf1c3f02e3b921d'
const clientSecret = 'ca0f02ae5dc0db7c4f4cd94f6e56b878d48f93cc'
const axios = require('axios');
module.exports = (req, res) => {
//   console.log(req);
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token`,
    headers: {
      accept: 'application/json',
    },
    data: {
      client_id: clientID,
      client_secret: clientSecret,
      code: req.body.authorizationCode
    }// 
  }).then(res => {
    accessToken = res.data.access_token;
    // console.log(res.data)
    res.status(200).json({ accessToken: accessToken })   // 토큰 전달
  }).catch(e => {
    res.status(404)
  })
}

// authorizationCode 로 accessToken 받아와 넘겨줌
