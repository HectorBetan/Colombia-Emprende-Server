let mongoose = require('mongoose'),
express = require('express');
router = express.Router();
let storeSchema = require('../models/Stores');
let productSchema = require('../models/Products');
router.route('/').get((req, res) => {
    const query = {Delete: {$nin:true}}
    storeSchema.find(query,(error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
router.route('/products').get((req, res) => {
    const query = {Delete: {$nin:true}}
    productSchema.find(query,(error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
router.route('/six-stores').get((req, res) => {
    const query = {Delete: {$nin:true}}
    storeSchema.find(query,(error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    }).limit(6).sort({$natural:-1});
})
module.exports = router;