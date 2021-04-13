const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

//Crear servidor
const app = express();

//Habilitar Cors
const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        const exist = whiteList.some( dominio => dominio === origin);
        if( exist ) {
            callback(null, true)
        } else {
            callback(new Error('No Permitido por CORS'))
        }
    }
}
//app.use( cors(corsOptions));
app.use(cors());

//Conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//Habilitar el body'parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//habiltar routing
app.use('/', routes());

//puerto y arrancar el servidor
app.listen(4000, () => {
    console.log('Servidor funcionando');
})