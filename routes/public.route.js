let mongoose = require("mongoose"),
express = require("express");
router = express.Router();
nodemailer = require('nodemailer');
const settings = require("../config/settings.js");
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'colombia.emprende.co@gmail.com',
    pass: 'COLOMBIA0emprende'
  }
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
  let msj = "hola desde colombia emprende"
  let mailOptions = {
    from: 'colombia.emprende.co@gmail.com',
    to: 'hectorbetancourt1992@gmail.com',
    subject: 'Asunto Del Correo',
    text: msj
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
})
module.exports = router;