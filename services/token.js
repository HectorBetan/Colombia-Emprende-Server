const jwt = require('jsonwebtoken');

const settings = require("../config/settings");

function createToken(user){
    const payload = {
        _id:user._id,
        Uid:user.Uid,
        Email:user.tipo_usuario
    }
    return jwt.sign(payload, settings.secret)
}
module.exports ={createToken}