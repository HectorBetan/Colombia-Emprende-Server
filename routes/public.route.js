let mongoose = require("mongoose"),
express = require("express");
router = express.Router();
nodemailer = require('nodemailer');
const settings = require("../config/settings.js");
let transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "hectorbetancourt1992@gmail.com",
    pass: "5U4aJQ97xIfEpZYg",
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
    from: mail.Nombre+" - Colombia Emprende <info@colombiaemprende>",
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