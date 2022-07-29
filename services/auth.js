const jwt = require('jsonwebtoken');
const settings = require("../config/settings");
function isAuth (token){
    if(!token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload =jwt.decode(token, settings.secret);
    //req.usuario = payload;
    console.log(payload);
}
module.exports = isAuth