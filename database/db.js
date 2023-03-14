const config = require("../config/config.js");
module.exports = {
    db: `mongodb+srv://HectorBetan:${config.DB}@colombiaemprende.qiittao.mongodb.net/colombia-emprende?retryWrites=true&w=majority`,
};