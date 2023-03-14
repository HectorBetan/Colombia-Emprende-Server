const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
function isAuth(token) {
  const secret = config.SECRET;
  const auth = token.split(" ")[1];
  if (!token) {
    return res.status(403).send({ mensaje: "sin autorización" });
  }
  const payload = jwt.verify(auth, secret);
  return payload.data[0];
}
module.exports = { isAuth };