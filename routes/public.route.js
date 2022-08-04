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
module.exports = router;