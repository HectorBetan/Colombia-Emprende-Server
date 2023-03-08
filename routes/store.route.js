let mongoose = require("mongoose"),
express = require("express");
const auth = require("../services/auth.js");
router = express.Router();
let storeSchema = require("../models/Stores");
router.route("/create-store").post((req, res, next) => {
  if (req.headers.token === null) {
    return res.status(403).send({ mensaje: "sin autorización" });
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
    Path: req.body.Path,
  };
  storeSchema.create(store, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route(`/get-store`).post((req, res) => {
  const query = { User_id: req.body.user_id };
  storeSchema.find(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route(`/find-store-path/:path`).get((req, res) => {
  const query = { Path: req.params.path };
  storeSchema.find(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/update-store").put((req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  storeSchema.findByIdAndUpdate(
    payload.Emprendimiento_id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});
router.route("/delete-store").put((req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  const setData = {
    Delete: true,
    User_id: new mongoose.Types.ObjectId(),
    Email: new mongoose.Types.ObjectId(),
    Telefono: "",
    Descripcion: "",
    Imagen: "",
    Facebook: "",
    Instagram: "",
    Web: "",
    Path: "",
  };
  storeSchema.findByIdAndUpdate(
    payload.Emprendimiento_id,
    {
      $set: setData,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});
router.route("/get-stores").post((req, res, next) => {
  const query = { _id: { $in: req.body } };
  storeSchema.find(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/set-stars/:id").put((req, res, next) => {
  let fecha = new Date();
  let calificacion = {
    Usuario: req.body.Usuario,
    Estrellas: req.body.Stars,
    Comentario: req.body.Comentario,
    Fecha: fecha.getDate(),
  };
  storeSchema.findByIdAndUpdate(
    req.params.id,
    {
      $push: { Calificacion: calificacion },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});
module.exports = router;