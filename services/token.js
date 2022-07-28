const jwt = require('jsonwebtoken');
require('dotenv').config({path:"./.env"});

function createToken(user){
    const payload = {
        _id:user._id,
        Nombre:usuario.Nombre,
        tipo_usuario:usuario.tipo_usuario
    }
    const token= process.env.CLAVE;
    return jwt.encode(payload, token)
}
module.exports ={createToken}