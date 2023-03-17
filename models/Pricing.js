const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let pricingSchema = new Schema(
  {
    User_id: {
      type: String,
    },
    Emprendimiento_id: {
      type: String,
    },
    Pedidos: {
      type: Array,
    },
    Fecha: {
      type: Date,
    },
    Valor_Envio: {
      type: Number,
    },
    Otros_Valores: {
      type: Number,
    },
    Justificacion: {
      type: String,
    },
    Envio: {
      type: Boolean,
    },
    Ciudad_Envio: {
      type: String,
    },
    Direccion_Envio: {
      type: String,
    },
    User_Comentarios: {
      type: String,
    },
    Comentarios: {
      type: String,
    },
    Estado: {
      type: String,
    },
    Pago: {
      type: Boolean,
    },
    Info_Pago: {
      type: Object,
    },
    Info_Envio: {
      type: Object,
    },
    Comentarios_Finales: {
      type: String,
    },
    Comentarios_Envio: {
      type: String,
    },
    User_Delete: {
      type: Boolean,
    },
    Store_Delete: {
      type: Boolean,
    },
    User_Problem: {
      type: Array,
    },
    Store_Problem: {
      type: Array,
    },
    Calificacion: {
      type: Boolean,
    },
  },
  {
    collection: "pricings",
  }
);
module.exports = mongoose.model("Pricing", pricingSchema);