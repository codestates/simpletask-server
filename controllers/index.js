const models = require('../models');
const { user, user_friend, friendlist, contents } = models
const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = {
    signInController: async (req, res) => {
        const userInfo = await user.findOne({
            where: { 
                email: req.body.email,
                password: req.body.password }
        })
        // 없는 경우에는 보내지 마세요(ad)
        if(!userInfo){
            res.status(404).json({
                data : '',
                message : 'fail'
            })
        } else {
            // delete userInfo.dataValues.password
            // const accessToken = jwt.sign(userInfo.dataValues,process.env.ACCESS_SECRET,{expiresIn : '1m'})
            // const refreshToken = jwt.sign(userInfo.dataValues,process.env.REFRESH_SECRET,{expiresIn : '2m'})
            // res.cookie('refreshToken', refreshToken)

            res.status(200).json({
                data: '',
                message : 'ok'
            })
        }
    },

    signOutController: async (req, res) => {
        // https가 된다면 작성
        res.clearCookie('refreshToken', {
            path: '/'
        })
        res.status(200).json({
            data: '',
            message: 'ok'
        })
    },

    signUpController: async (req, res) => {
        const userInfo = await user.findOne({
            where: {
                email: req.body.email
            }
            // 비밀번호랑 비밀번호 확인은 프론트에서
        })

        if(userInfo){
            res.status(404).json({
                data: '',
                message : 'fail'
            })
        } else {
            friendlist.create({
                name: req.body.name
            })

            user.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                nickname: req.body.nickname
            })
            .then(data => {
                res.status(200).json({
                    data: '',
                    message: 'ok'
                })
            })
        }
    },

    createController: async(req, res) => {
        contents.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.body.user_id,
            // 원래는 토큰 같은곳에서 이름 뽑아오기
        })
        .then(() => {
            res.status(200).json({
                data: '',
                message: 'ok'
            })
        })
    },

    editController: (req, res) => {
        // req.body.name === tokken.id
        contents.update({
            text: req.body.text,
            title: req.body.title
        }, {
            where: {
                id: req.body.id
                //게시글 id도 보내주세요
            }
        })
        .then(() => {
            res.status(200).json({
                data: '',
                message: 'ok'
            })
        })
        .catch(err =>{
            console.log(err)
        })
    },

    deleteController: async (req, res) => {
        // tokken.id
        contents.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(() => {
            res.status(200).json({
                data: '',
                message: 'ok'
            })
        })
        .catch(err =>{
            console.log(err)
        })
    },

    contentsController: async (req, res) => {
        const content = await contents.findAll({})
        
        res.status(200).json({
            data : content,
            message : 'ok'
        })
    },

    editpwController: async (req, res) => {
        user.update({
            password: req.body.password
        }, {
            where: {
                email: req.body.email
                // 원래는 토큰...
                //게시글 id도 보내주세요
            }
        })
        .then(() => {
            res.status(200).json({
                data: '',
                message: 'ok'
            })
        })
        .catch(err =>{
            console.log(err)
        })
    },

    deleteidController: async (req, res) => {
        // 글 삭제가 자동으로 되지 않습니다.
        user.destroy({
            where: {
                email: req.body.email
            }
        })
        .then(() => {
            res.status(200).json({
                data: '',
                message: 'ok'
            })
        })
        .catch(err =>{
            console.log(err)
        })
    },

    userController: async (req, res) => {
        // const userInfo = await user.findAll({})
        const userInfo = await user.findOne({
            where: {
                email: req.body.email
            }
        })

        const link = await user_friend.findAll({
            where: {
                userId: userInfo.dataValues.id
            }, 
        })

        let number = []
        let test = ''

        if(link){
            for(let i = 0; i < link.length; i++){
                number.push(link[i].friendId)
            }

        }

        if(number.length !==0){
            for(let j = 0; j < number.length; j++){
                const friend = await friendlist.findOne({
                    where: {
                        id: number[j]
                    }
                })
                if(test === ''){
                    test = friend.dataValues.name
                } else {
                    test = test + `, ${friend.dataValues.name}`
                }
                
                // test.push(friend.dataValues.name)
            }
        }

        if(test.length !== 0){
            userInfo.dataValues.friend = test
        }
        
        res.status(200).json({
            data : userInfo,
            message : "ok"
        })
    },

    addfriendController: async(res, req) => {
        const isreal = await friendlist.findOne({
            where: {
                name: res.body.name
            }
        })
        if(!isreal){
            req.status(404).json({
                data : '',
                message : 'fail'
            })
        } else {
            user_friend.create({
                userId: res.body.id,
                friendId: isreal.dataValues.id
            })
            req.status(200).json({
                data : '',
                message : 'ok'
            })
        }
    },

    accessTokenRequest: (res, req) => {
        const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(400).send({
            data: null,
            message: 'invalid access token'
            })
        } else {
            const token = authorization.split(' ')[1];
            let userdata = jwt.verify(token,process.env.ACCESS_SECRET)
            let userInfo = {
            id: userdata.id,
            userId: userdata.userId,
            email: userdata.email,
            createdAt: userdata.createdAt,
            updatedAt: userdata.updatedAt
            }

            res.status(200).send({
            data :{userInfo : userInfo} ,
            message : 'ok'
            })        
        }
    },

    refreshTokenRequest: (res,req) => {
        let cookie = req.headers.cookie

        if(!cookie) {   // cookie가 있는지
            res.status(400).send({
            data: null,
            message: 'refresh token not provided'
            })
        } else {
            const token = cookie.split('=')[1];
            if(token === 'invalidtoken'){
            res.status(400).send({
                data: null,
                message: 'invalid refresh token, please log in again'
            })
            } else {
            let userdata = jwt.verify(token, process.env.REFRESH_SECRET)
            let userInfo = {
                id: userdata.id,
                userId: userdata.userId,
                email: userdata.email,
                createdAt: userdata.createdAt,
                updatedAt: userdata.updatedAt
            }
            let newToken = jwt.sign(userInfo,process.env.REFRESH_SECRET)
            let accessToken = jwt.sign(userInfo,process.env.ACCESS_SECRET)

            res.cookie('newToken', newToken )
            res.status(200).send({
                data: {
                userInfo :userInfo,
                accessToken : accessToken 
                }, 
                message : 'ok'}
                )
            }
        }
    }
}