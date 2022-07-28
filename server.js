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
    console.log('Database sucessfully connected!')
},
    error => {
    console.log('Could not connect to database : ' + error)
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
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.status+' '+err.message);
});
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});