let mongoose = require('mongoose'),
 express = require('express'),
 router = express.Router();
// Producto Model
let cartSchema = require('../Models/Cart');

// CREATE Producto
router.route('/create-cart').post((req, res, next) => {
    const cart = {
        User_id: req.body.User_id,
        Emprendimiento_id: req.body.Emprendimiento_id,
        Producto_id: req.body.Producto_id,
        Cantidad: req.body.Cantidad,
        Estado: "carrito"
    }
    cartSchema.create(cart, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   });
   router.route('/get-carrito/:id').get((req, res, next) => {
    const query = {UserEmail: req.params.id, Estado: "Carrito"}
    cartSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
   router.route('/get-pedidos/:id').get((req, res, next) => {
    const query = {UserEmail: req.params.id, Estado: {$in: "en cotizacion"}}
    cartSchema.find( query, (error, data) => {
    if (error) {
        console.log(error)
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
   router.route('/get-pedidos').post((req, res, next) => {
    console.log("get-pedidos",req.body)
    const query = {_id: {$in: req.body.id}}
    cartSchema.find( query, (error, data) => {
    if (error) {
        console.log(error)
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
   router.route('/get-pedidos-emprendedor/:id').get((req, res, next) => {
    const query = {Emprendimiento_id: req.params.id, Estado: {$nin: "Carrito"}}
    cartSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
   router.route('/get-product/:id').get((req, res, next) => {
    const query = {UserEmail: req.params.id}
    cartSchema.findById(query, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
   // Update Producto
   router.route('/update-carrito/:id').put((req, res, next) => {
    cartSchema.findByIdAndUpdate(req.params.id, {
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
   // Definir Por Id
   router.route('/update-carritos').put((req, res, next) => {
    const query = {_id: {$in:req.body.id}}
    cartSchema.updateMany(query, {
    $set: req.body.Estado
    }, (error, data) => {
    if (error) {
    return next(error);
    } else {
    res.json(data)
    }
    })
   })
   // Definir Por Id
   router.route('/update-carrito-cotizar').put((req, res, next) => {
    const query = {_id: {$in:req.body.id}}
    cartSchema.updateMany(query, {
    $set: req.body.Estado
    }, (error, data) => {
    if (error) {
    return next(error);
    } else {
    res.json(data)
    }
    })
   })
   // Delete Producto
   router.route('/delete-carrito/:id').delete((req, res, next) => {
    cartSchema.findByIdAndRemove(req.params.id, (error, data) =>
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
   router.route('/delete-carritos').post((req, res, next) => {
    console.log("delete-carritos",req.body)
    const query = {_id: {$in:req.body.id}}
    cartSchema.deleteMany(query, (error, data) =>
   {
    if (error) {
    return next(error);
    } else {
    console.log("borrados")
    res.status(200).json({
    msg: data
    })
    }
    })
   })
   module.exports = router;

