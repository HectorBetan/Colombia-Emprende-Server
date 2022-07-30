const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let storeSchema = new Schema({
    Key: {
        type: String,
    },
    Nombre: {
        unique: true,
        type: String
    },
    Email: {
        type: String
    },
    Celular: {
        type: Number
    },
    Telefono: {
        type: Number
    },
    Direccion: {
        type: String
    },
    Descripcion: {
        type: String
    },
    Imagen: {
        type: String
    },
    Facebook: {
        type: String
    },
    Instagram: {
        type: String
    },
    Web: {
        type: String
    },
    Ciudad: {
        type: String
    },
    Categoria: {
        type: String
    },
    
}, {
 collection: 'emprendimientos'
 })
 
module.exports = mongoose.model('Emprendimiento', storeSchema)