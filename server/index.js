//importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');
const configs = require('./config');
const db = require('./config/database');
require('dotenv').config({path: 'variables.env'});


db.authenticate()
    .then(() =>{
        console.log('base de datos conectada');
    })
    .catch(error => console.log(error));

//configurar express
const app = express();

//habilitar pug
app.set('view engine', 'pug');

//añadir las vistas
app.set('views', path.join(__dirname, './views'));

//cargar una carpeta estatica llamada public
app.use(express.static('public'));

//validar si estamos en desarrollo o produccion
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual y genera la ruta
app.use((req, res, next) =>{
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();

});

//ejecutamos el body parser
app.use(bodyParser.urlencoded({extended: true}));
//cargar las rutas
app.use('/',router() );

//puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () =>{
    console.log('el servidor esta funcionando');
});
