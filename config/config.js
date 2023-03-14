require('dotenv').config();
module.exports = {
  SECRET: process.env.SECRET,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  MAIL: process.env.MAIL, 
}