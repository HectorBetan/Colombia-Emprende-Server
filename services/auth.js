const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const settings = require("../config/settings");
function isAuth (token){
    const secret = "colombiaemprendeapp";
    const auth = token.split(' ')[1];
    const t = token.split('.')[1]+"."+token.split('.')[2];
    if(!token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    console.log("token",auth);
    jwt.verify(t, secret, (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            console.log({
                    mensaje: "Post fue creado",
                    authData
                });
        }
    });
    const payload = jwt.verify(t, secret);
    //req.usuario = payload;
    console.log(payload);
    return payload;
}
module.exports = {isAuth}