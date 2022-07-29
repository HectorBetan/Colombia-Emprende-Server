const jwt = require('jsonwebtoken');

const settings = require("../config/settings");

async function createToken(user){
    const secret = "colombiaemprendeapp";
    const payload = {
        _id:user._id,
        Uid:user.Uid,
        Email:user.tipo_usuario
    }
    
    const token = jwt.sign(payload, secret)
    return token;
}
module.exports ={createToken}