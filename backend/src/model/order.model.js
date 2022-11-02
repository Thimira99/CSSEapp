const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true,
	},
	material: {
		type: String,
		required: true,
	},
	quantity: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	status: {
		type: String,
	},
	userId: {
		type: String,
	},
	companyName: {
		type: String,
	},
	total: {
		type: String,
	},
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
