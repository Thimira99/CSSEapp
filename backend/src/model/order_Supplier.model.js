const mongoose = require('mongoose');

const orderSupplierSchema = new mongoose.Schema({
	supplierName: {
		type: String,
	},
	orderId: {
		type: String,
	},
});

const OrderSupplier = mongoose.model('ordersSupplier', orderSupplierSchema);
module.exports = OrderSupplier;
