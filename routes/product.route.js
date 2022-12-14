let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();
const auth = require("../services/auth.js");
let productSchema = require('../models/Products');
router.route('/create-product').post((req, res, next) => {
    if(req.headers.token === null){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    const product = {
        Nombre: req.body.Nombre,
        Precio: req.body.Precio,
        Descripcion: req.body.Descripcion,
        Imagen: req.body.Imagen,
        Emprendimiento_id: payload.Emprendimiento_id,
    }
    productSchema.create(product, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});
router.route('/get-store-products').post((req, res, next) => {
    
    const query = { User_id: req.body.id };
    productSchema.find( query, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log("aqui va la data bla bla bla")
            console.log(data)
            res.json(data)
        }
    })
})
router.route('/update-product/:id').put((req, res, next) => {
    if(!req.headers.token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    if (payload._id !== req.body.User_id) {
        return res.status(403).send({mensaje:"sin autorización"});
    }
    productSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log(data);
            res.json(data)
        }
    })
})
router.route('/delete-product/:id').post((req, res, next) => {
    if(!req.headers.token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    console.log(req.body);
    if (payload._id !== req.body.User_id) {
        return res.status(403).send({mensaje:"sin autorización"});
    }
    productSchema.findByIdAndRemove(req.params.id, (error, data) =>{
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
            msg: data
        })
        }
    })
})
router.route('/get-products').post((req, res, next) => {
    const query = { _id: {$in: req.body} };
    productSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
        res.json(data)
    }
    })
})
module.exports = router;