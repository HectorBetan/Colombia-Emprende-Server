let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
// Express Route
const userRoute = require('./routes/user.route')
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
// PORT
app.set("PORT", process.env.PORT || 4000);
app.listen(app.get("PORT"), () => {
    console.log(`Servidor iniciado en el puerto: ${app.get("PORT")}`);
});
// 404 Error
function createError(codigo) {
    return('Error '+codigo+': La ruta no existe');
}
app.use((req, res, next) => {
    const er = next(createError(404));
    if (er) {
        res.send(er);
    }
});
app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send('Error:'+ err.statusCode+' '+err.message);
});
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});