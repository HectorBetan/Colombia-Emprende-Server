let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
// Express Route
const userRoute = require('./routes/user.route')
const storeRoute = require('./routes/store.route')
// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Conectado a la base de datos!')
},
    error => {
    console.log('No se puede conectar a la base de datos: ' + error)
    }
)
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(cors());
app.use('/users', userRoute )
app.use('/stores', storeRoute )
// PORT
app.set("PORT", process.env.PORT || 4000);
app.listen(app.get("PORT"), () => {
    console.log(`Servidor iniciado en el puerto: ${app.get("PORT")}`);
});
// 404 Error
function createError(codigo) {
    throw new Error('404');
}
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    if (err.message === '404') {
        res.status(404).send('Error 404: No se encontró el recurso');
    }
    else if (!err.statusCode) {
        err.statusCode = 500;
        res.status(err.statusCode).send('Error:'+ err.statusCode+' '+err.message);
    }
});
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});