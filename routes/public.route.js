let mongoose = require("mongoose"),
express = require("express");
router = express.Router();
const auth = require("../services/auth.js");
const config = require("../config/config.js");
nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: config.MAIL,
    pass: config.PASSWORD,
  },
});
let storeSchema = require("../models/Stores");
let productSchema = require("../models/Products");
router.route("/").get((req, res) => {
  const query = { Delete: { $nin: true } };
  storeSchema.find(query, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/products").get((req, res) => {
  const query = { Delete: { $nin: true } };
  productSchema.find(query, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/six-stores").get((req, res) => {
  const query = { Delete: { $nin: true } };
  storeSchema
    .find(query, (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
      }
    })
    .limit(6)
    .sort({ $natural: -1 });
});
router.route("/enviar-email").post((req, res, next) => {
  let mail = req.body
  let mailOptions = {
    from: `${mail.Nombre} - Colombia Emprende <info@colombiaemprende>`,
    to: mail.Email,
    subject: mail.Subject,
    text: mail.Msj,
    html: mail.Html
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
  });
})
router.route("/enviar-user-email").post((req, res, next) => {
  let mail = req.body
  if (req.headers.token === null) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = auth.isAuth(req.headers.token);
  if (!payload){
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  let mailOptions = {
    from: `Colombia Emprende - ${mail.Nombre} <info@colombiaemprende>`,
    to: mail.Email,
    subject: mail.Subject,
    text: mail.Msj,
    html: mail.Html
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
  });
})
module.exports = router;