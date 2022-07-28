const jwt = require('jsonwebtoken');
require('dotenv').config({path:"./.env"});

function createToken(user){
    const payload = {
        _id:user._id,
        Uid:user.Uid,
        Email:user.tipo_usuario
    }
    const token= process.env.CLAVE;
    return jwt.sign(payload, token)
}
module.exports ={createToken}