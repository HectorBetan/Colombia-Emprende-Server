let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();
let userSchema = require('../models/Users');
router.route('/create-user').post((req, res, next) => {
    console.log('reqbody',req.body);
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
router.route('/get-user').post((req, res) => {
    const query = {Uid: req.query.Uid};
    userSchema.find(query,(error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    console.log(data)
    }
    })
})
router.route('/').get((req, res) => {
    userSchema.find((error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    console.log(data)
    }
    })
})
module.exports = router;