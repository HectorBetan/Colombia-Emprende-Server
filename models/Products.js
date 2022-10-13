const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let productSchema = new Schema({
    Nombre: {
        type: String
    },
    Precio: {
        type: Number
    },
    Descripcion: {
        type: String
    },
    Imagen: {
        type: String
    },
    ImgRoute: {
        type: String
    },
    Emprendimiento_id:{
        type: String
    },
},
{
    collection: 'productos'
})   
module.exports = mongoose.model('Producto', productSchema)