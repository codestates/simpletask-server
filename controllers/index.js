const models = require('../models');
const { user, user_friend, friendlist, contents } = models

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
            res.status(200).json({
                data: '',
                message : 'ok'
            })
        }
    },

    signOutController: async (req, res) => {
        // https가 된다면 작성
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
            friendlist.creat({
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
        // 글작성, 글수정, 글삭제
        // req.body - > 작성, 수정, 삭제
        // 로그인 한 상황

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
            text: req.body.text
            // 제목도 추가
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

        // 다른방법
        // const edit = await contents.findOne({
        //     where: { 
        //         id: req.body.id,
        //     }
        // })

        // edit.text = req.body.text

        // await edit.save()
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

        // const deletecontent = await contents.findOne({
        //     where: {
        //                 id: req.body.id
        //             }
        // })

        // deletecontent.destroy()

        // res.status(200),json({
        //     data: '',
        //     message: 'ok'
        // })
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
    }

    



}