let mongoose = require('mongoose'),
express = require('express');
router = express.Router();
let storeSchema = require('../models/Stores');
let productSchema = require('../models/Products');
router.route('/').get((req, res) => {
    storeSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
router.route('/products').get((req, res) => {
    productSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
router.route('/5-stores').get((req, res) => {
    storeSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    }).limit(6).sort({$natural:-1});
})
module.exports = router;