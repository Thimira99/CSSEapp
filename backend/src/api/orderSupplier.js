const express = require('express');
const router = express.Router();
const supplierController = require('../controller/orderSupplier.controller');

module.exports = function () {
	router.post('/orderSupplier', supplierController.createSupplier);
	router.get('/', supplierController.getAllSupplier);
	router.get('/:id', supplierController.getSupplierOrder);

	return router;
};
