let mongoose = require('mongoose'),
express = require('express');
const usertoken = require("../services/token.js");
const auth = require("../services/auth.js");
router = express.Router();
let userSchema = require('../models/Users');
router.route('/create-user').post((req, res, next) => {
    if (!req.body.Uid) {
        return res.status(400).send('Uid requerida');
    }
    userSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});
router.route(`/get-user/:uid`).get((req, res) => {
    const query = {Uid: req.params.uid};
    userSchema.find(query,(error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json({data:data, token:usertoken.createToken(data)});
        }
    })
});
router.route('/update-user').put((req, res, next) => {
    console.log(req.headers);
    console.log(req.body);
    if(req.headers.authorization==null){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const token = req.headers.token;
    auth.isAuth(token)
    // userSchema.findOneAndUpdate(query, {
    //     $set: req.body
    // }, (error, data) => {
    //     if (error) {
    //         return next(error);
    //         console.log(error)
    //     } else {
    //         res.json(data)
    //     }
    // })
})
module.exports = router;