const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    Uid:{
        type: String,
        unique: true
    },
    Nombre: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    },
    Celular: {
        type: String
    },
    Ciudad:{
        type: String
    },
    Direccion:{
        type: String
    },
    Emprendimiento_id:{
        type: String
    },
},
{
    collection: 'usuarios'
})     
module.exports = mongoose.model('Usuario', userSchema)