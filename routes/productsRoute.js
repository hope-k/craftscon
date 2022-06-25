const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');




router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getSingleProduct);
router.post('/add-product', protectedRoute, productsController.addProduct);
router.put('/edit-product/:id', productsController.editProduct);
router.delete('/delete-product', productsController.deleteProduct);


module.exports = router;