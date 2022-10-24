

let mongoose = require('mongoose'),
 express = require('express'),
 router = express.Router();
// Producto Model
let pricingSchema = require('../models/Pricing');

// CREATE Producto
router.route('/create-pricing').post((req, res, next) => {
    pricingSchema.create(req.body, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   });
   // Get Single Producto
router.route('/get-pricing/:id').get((req, res, next) => {
    const query = {User_id: req.params.id, Pago: false};
    pricingSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
        console.log(data)
    res.json(data)
    }
    })
})

router.route('/get-store-pricing/:id').get((req, res, next) => {
    const query = {Emprendimiento_id: req.params.id, Pago: false};
    pricingSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
        console.log(data)
    res.json(data)
    }
    })
})
router.route('/get-orders/:id').get((req, res, next) => {
    const query = {User_id: req.params.id, Pago: true};
    pricingSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
        console.log(data)
    res.json(data)
    }
    })
})
router.route('/get-store-orders/:id').get((req, res, next) => {
    const query = {Emprendimiento_id: req.params.id, Pago: true};
    pricingSchema.find( query, (error, data) => {
    if (error) {
    return next(error)
    } else {
        console.log(data)
    res.json(data)
    }
    })
})
   router.route('/get-product/:id').get((req, res, next) => {
    pricingSchema.findById(req.params.id, (error, data) => {
    if (error) {
    return next(error)
    } else {
    res.json(data)
    }
    })
   })
   // Update Producto
   router.route('/update-pricing/:id').put((req, res, next) => {
    pricingSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
    }, (error, data) => {
    if (error) {
    return next(error);
    console.log(error)
    } else {
    res.json(data)
    }
    })
   })
   // Create Pedido
   router.route('/create-order/:id').put((req, res, next) => {
    const pricing = {
        Pago: true,
        Estado: "pagado",
        Info_Pago: {
            Id: new mongoose.Types.ObjectId(),
            Tipo_Pago: req.body.Tipo_Pago,
            Cedula: req.body.Cedula,
            Valor_Total: req.body.Valor_Total,
        },
    }
    pricingSchema.findByIdAndUpdate(req.params.id, {
        
    $set: pricing
    }, (error, data) => {
    if (error) {
    return next(error);
    console.log(error)
    } else {
    res.json(data)
    }
    })
   })
   // Delete Producto
   router.route('/delete-pricing/:id').delete((req, res, next) => {
    pricingSchema.findByIdAndRemove(req.params.id, (error, data) =>
   {
    if (error) {
    return next(error);
    } else {
    res.status(200).json({
    msg: data
    })
    }
    })
   })
   router.route('/create-envio/:id').put((req, res, next) => {
    const envio = {
        Pago: true,
        Estado: "envio",
        Info_Envio: {
            Id: new mongoose.Types.ObjectId(),
            Fecha_Envio: req.body.Fecha_Envio,
            Empresa_Envio: req.body.Empresa_Envio,
            Numero_Guia: req.body.Numero_Guia,
            Comentarios_Envio: req.body.Comentarios_Envio,
        },
    }
    pricingSchema.findByIdAndUpdate(req.params.id, {
        
    $set: envio
    }, (error, data) => {
    if (error) {
    return next(error);
    console.log(error)
    } else {
    res.json(data)
    }
    })
   })
   module.exports = router;