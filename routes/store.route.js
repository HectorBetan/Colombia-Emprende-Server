let mongoose = require('mongoose'),
express = require('express');
const jwt = require('jsonwebtoken');
const auth = require("../services/auth.js");
router = express.Router();
let storeSchema = require('../models/Stores');
router.route('/create-store').post((req, res, next) => {
    if(req.headers.token === null){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    const store = {
        User_id: payload._id,
        Nombre: req.body.Nombre,
        Email: req.body.Email,
        Celular: req.body.Celular,
        Telefono: req.body.Telefono,
        Direccion: req.body.Direccion,
        Descripcion: req.body.Descripcion,
        Imagen: req.body.Imagen,
        Facebook: req.body.Facebook,
        Instagram: req.body.Instagram,
        Web: req.body.Web,
        Ciudad: req.body.Ciudad,
        Categoria: req.body.Categoria,
        Calificacion: req.body.Calificacion,
    }
    storeSchema.create(store, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});
router.route(`/get-store`).get((req, res) => {
    if(!req.headers.token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    const query = {User_id: payload._id};
    storeSchema.find(query,(error, data) => {
        if (error) {
            return next(error)
        } else {
            const token = jwt.sign({data}, "colombiaemprendeapp");
            res.json({data:data, token:token});
        }
    })
});
router.route('/update-store').put((req, res, next) => {
    if(!req.headers.token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    storeSchema.findByIdAndUpdate(payload.Emprendimiento_id, {
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
router.route('/delete-user/:id').delete((req, res, next) => {
    if(!req.headers.token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = auth.isAuth(req.headers.token);
    userSchema.findByIdAndRemove(payload._id, (error, data) =>{
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