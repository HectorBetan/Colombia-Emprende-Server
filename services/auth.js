const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const settings = require("../config/settings");
function isAuth (token){
    const auth = token.split(' ')[1];
    if(!token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    console.log("token",auth);
    const payload = jwt.verify(auth, settings.secret);
    //req.usuario = payload;
    console.log(payload);
    return payload;
}
module.exports = {isAuth}