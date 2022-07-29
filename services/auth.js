const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const settings = require("../config/settings");
function isAuth (token){
    const secret = "colombiaemprendeapp";
    const auth = token.split(' ')[1];
    if(!token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    console.log("token",auth);
    jwt.verify(auth, secret, (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            console.log({
                    mensaje: "Post fue creado",
                    authData
                });
        }
    });
    const payload = jwt.verify(auth, secret);
    //req.usuario = payload;
    console.log(payload);
    return payload;
}
module.exports = {isAuth}