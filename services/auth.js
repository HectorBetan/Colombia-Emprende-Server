const jwt = require('jsonwebtoken');
require('dotenv').config({path:"./.env"});
function isAuth (req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const token =req.headers.authorization.split('')[1];
    const payload =jwt.decode(token, CLAVE);
    //req.usuario = payload;
    console.log(payload);
    next();
}
module.exports = isAuth