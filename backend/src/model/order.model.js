const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderId: {
		type: String,
		required: true,
	},
	item: [
		{
			material: {
				type: String,
			},
			quantity: {
				type: String,
			},
		},
	],
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
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
