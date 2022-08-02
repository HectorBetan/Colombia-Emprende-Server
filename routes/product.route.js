let mongoose = require('mongoose'),
express = require('express'),
router = express.Router();
const auth = require("../services/auth.js");
let productSchema = require('../models/Products');
router.route('/create-product').post((req, res, next) => {
    if(req.headers.token === null){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);W
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
module.exports = router;