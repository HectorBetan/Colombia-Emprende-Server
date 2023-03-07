const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let cartSchema = new Schema(
  {
    User_id: {
      type: String,
    },
    Emprendimiento_id: {
      type: String,
    },
    Producto_id: {
      type: String,
    },
    Cantidad: {
      type: Number,
    },
  },
  {
    collection: "cart",
  }
);
module.exports = mongoose.model("Cart", cartSchema);