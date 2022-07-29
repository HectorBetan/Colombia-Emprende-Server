let mongoose = require('mongoose'),
express = require('express');
const jwt = require('jsonwebtoken');
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
            const token = jwt.sign({data}, "colombiaemprendeapp");
            res.json({data:data, token:token});
        }
    })
});
router.route('/update-user').put((req, res, next) => {
    if(req.headers.token==null){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    console.log('payload');
    console.log(payload.data);
    console.log('payloaddataid');
    console.log(payload.data[0]._id);
    userSchema.findByIdAndUpdate(payload.data[0]._id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            console.log('data',data)
            res.json(data)
        }
    })
})
module.exports = router;