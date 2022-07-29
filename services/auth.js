const jwt = require('jsonwebtoken');
const settings = require("../config/settings");
function isAuth (token){
    const secret = "colombiaemprendeapp";
    const auth = token.split(' ')[1];
    if(!token){
        return res.status(403).send({mensaje:"sin autorización"});
    }
    const payload = jwt.verify(auth, secret);
    return payload;
}
module.exports = {isAuth}