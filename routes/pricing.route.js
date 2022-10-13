

let mongoose = require('mongoose'),
 express = require('express'),
 router = express.Router();
// Producto Model
let pricingSchema = require('../models/Pricing');

// CREATE Producto
router.route('/create-pricing').post((req, res, next) => {
    pricingSchema.create(req.body, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   });
   // Get Single Producto
router.route('/get-cotizacion/:id').get((req, res, next) => {
    const query = {User_id: req.params.id};
    pricingSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
        console.log(data)
    res.json(data)
    }
    })
   })
   router.route('/get-product/:id').get((req, res, next) => {
    pricingSchema.findById(req.params.id, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
   // Update Producto
   router.route('/update-cotizacion/:id').put((req, res, next) => {
    pricingSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
    }, (error, data) => {
    if (error) {
    return next(error);
    console.log(error)
    } else {
    res.json(data)
    }
    })
   })
   // Delete Producto
   router.route('/delete-carrito/:id').delete((req, res, next) => {
    productoSchema.findByIdAndRemove(req.params.id, (error, data) =>
   {
    if (error) {
    return next(error);
    } else {
    res.status(200).json({
    msg: data
    })
    }
    })
   })
   
   module.exports = router;