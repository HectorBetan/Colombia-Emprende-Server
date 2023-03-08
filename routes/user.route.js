let mongoose = require("mongoose"),
express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../services/auth.js");
const settings = require("../config/settings.js");
router = express.Router();
let userSchema = require("../models/Users");
router.route("/create-user").post((req, res, next) => {
  if (!req.body.Uid) {
    return res.status(400).send("Uid requerida");
  }
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route(`/get-user/:uid`).get((req, res) => {
  const query = { Uid: req.params.uid };
  userSchema.find(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      const token = jwt.sign({ data }, settings.secret);
      res.json({ data: data, token: token });
    }
  });
});
router.route("/get-user-info").post((req, res, next) => {
  const query = { Uid: { $in: req.body } };
  userSchema.find(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/update-user").put((req, res, next) => {
  if (req.headers.token === null) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  userSchema.findByIdAndUpdate(
    payload._id,
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
router.route("/del-user").put((req, res, next) => {
  if (req.headers.token === null) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  const setData = {
    Delete: true,
    Uid: new mongoose.Types.ObjectId(),
    Email: new mongoose.Types.ObjectId(),
    Emprendimiento_id: "",
  };
  userSchema.findByIdAndUpdate(
    payload._id,
    {
      $set: setData,
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
router.route("/delete-user").delete((req, res, next) => {
  if (req.headers.token === null) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  userSchema.findByIdAndDelete(
    payload._id,
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    }
  );
});
module.exports = router;