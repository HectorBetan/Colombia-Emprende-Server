let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();
const auth = require("../services/auth.js");
let productSchema = require("../models/Products");
router.route("/create-product").post((req, res, next) => {
  if (req.headers.token === null) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  const product = {
    Nombre: req.body.Nombre,
    Precio: req.body.Precio,
    Descripcion: req.body.Descripcion,
    Imagen: req.body.Imagen,
    Emprendimiento_id: payload.Emprendimiento_id,
    User_id: payload._id,
  };
  productSchema.create(product, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/get-store-products").post((req, res, next) => {
  const query = { User_id: req.body.id, Delete: { $nin: true } };
  productSchema.find(query, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/update-product/:id").put((req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  if (payload._id !== req.body.User_id) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  productSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});
router.route("/delete-product/:id").put((req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  if (payload._id !== req.body.User_id) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const setData = {
    Delete: true,
  };
  productSchema.findByIdAndUpdate(
    req.params.id,
    { $set: setData },
    (error, data) => {
      if (error) 
      {console.log(error);
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});
router.route("/get-products").post((req, res, next) => {
  const query = { _id: { $in: req.body } };
  productSchema.find(query, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
module.exports = router;