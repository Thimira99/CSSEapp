const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
	{
		orderId: {
			type: String,
			required: true,
		},
		amount: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Invoice = mongoose.model('invoices', invoiceSchema);
module.exports = Invoice;
