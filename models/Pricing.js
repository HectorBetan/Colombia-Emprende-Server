const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let pricingSchema = new Schema({
    User_id: {
        type: String
    },
    Emprendimiento_id: {
        type: String
    },
    Pedidos: {
        type: Array
    },
    Fecha: {
        type: Date
    },
    Valor_Envio: {
        type: Number
    },
    Otros_Valores: {
        type: Number
    },
    Descuento:{
        type: Number
    },
    User_Comentarios: {
        type: String
    },
    Comentarios: {
        type: String
    },
    Estado:{
        type: String
    },
    Pago:{
        type: Boolean
    },
    Info_Pago:{
        type: String
    },
    Fecha_Envio:{
        type: String
    },
    Numero_Guia: {
        type:String
    },
    },
    {
        collection: 'pricings'
        })
        
module.exports = mongoose.model('Pricing', pricingSchema)