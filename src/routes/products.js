// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);/* traigo todo los productos del index, del product controller.index, que renderiza el index */ 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); /* traeme el formulario renderizado */
router.post('/create', productsController.store); /* enviame la informacion del formulario */


/*** TRAEME UN PRODUCTO ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDITA UN PRODUCTO ***/ 
router.get('/edit/:id', productsController.edit); /* editarme un producto, renderizando */
router.put('/update/:id', productsController.update); /* subir un producto nuevo, lleva put porque modifica */


/*** ELIMINAME UN PRODUCTO***/  
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
