const Testimonial = require('../models/Testimoniales');


exports.mostrarTestimoniales = async(req,res) =>{
   const testimoniales = await Testimonial.findAll()
        res.render('testimoniales',{
            pagina: 'Testimonios',
            testimoniales
        });
}

exports.agregarTestimonio =async (req,res) =>{
        
    //validar qeu todos los campos esten llenos

    let {nombre, correo, mensaje} = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'mensaje': 'Agrega tu nombre'});
    }
    if(!correo){
        errores.push({'mensaje': 'Agrega un correo'});
    }
    if(!mensaje){
        errores.push({'mensaje': 'Agrega un mensaje'});
    }
    //revisar por los errores
    if(errores.length > 0){
        //muestra la vista con errores
       const testimoniales = await Testimonial.findAll()
       res.render('testimoniales', {
        errores,
        nombre,
        correo,
        mensaje,
        pagina: 'testimoniales',
        testimoniales
        })
    }else{
        //almacenarlo en la base de datos
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
        
    }
}