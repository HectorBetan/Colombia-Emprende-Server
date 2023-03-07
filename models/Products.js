const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let productSchema = new Schema(
  {
    Nombre: {
      type: String,
    },
    Precio: {
      type: Number,
    },
    Descripcion: {
      type: String,
    },
    Imagen: {
      type: String,
    },
    ImgRoute: {
      type: String,
    },
    Emprendimiento_id: {
      type: String,
    },
    User_id: {
      type: String,
    },
    Delete: {
      type: Boolean,
    },
  },
  {
    collection: "productos",
  }
);
module.exports = mongoose.model("Producto", productSchema);