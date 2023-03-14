const dotenv = require('dotenv').config();
module.exports = {
  SECRET: process.env.SECRET,
  PASSWORD: process.env.HOST,
  DB: process.env.DB,
}