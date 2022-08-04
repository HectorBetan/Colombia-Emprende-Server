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
        Emprendimiento_id: req.body.Emprendimiento_id,
        User_id: payload._id,
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
    if(req.headers.token === null){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    const query = { User_id: {$in:payload._id} };
    productSchema.find( query, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
router.route('/update-product').put((req, res, next) => {
    if(!req.headers.token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    const query = {_id: {$in: payload.Emprendimiento_id}, User_id: payload._id};
    productSchema.findOneAndUpdate(query, {
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
    const query = {_id: {$in:req.params.id}, User_id: {$in:payload._id}};
    console.log(query);
    productSchema.findOneAndRemove(query, (error, data) =>{
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