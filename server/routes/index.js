const express = require('express');
const router = express.Router();

//controladores
const nosotrosController = require('../controllers/nosotrosController');
const homeControllerPage = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testimonialController = require('../controllers/testimonialesController');


module.exports = function(){
    router.get('/',homeControllerPage.consultasHomePage );    
    router.get('/nosotros', nosotrosController.infoNosotros);    
    router.get('/viajes',viajesController.mostrarViajes );
    router.get('/viajes/:id',viajesController.mostrarViaje);
    router.get('/testimoniales', testimonialController.mostrarTestimoniales);
    //cuando se llena el formulario
    router.post('/testimoniales',testimonialController.agregarTestimonio);

    return router;
}