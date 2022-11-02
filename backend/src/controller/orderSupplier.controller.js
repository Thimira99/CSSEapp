const orderSupplier = require('../model/order_Supplier.model');

// Create Supplier
const createSupplier = async (req, res) => {
	if (req.body) {
		const supplier = new orderSupplier(req.body);
		await supplier
			.save()
			.then((data) => {
				res.status(200).send({ data: data });
			})
			.catch((error) => {
				res.status(500).send({ error: error.message });
			});
	}
};

// Get all delivery details
const getAllSupplier = async (req, res) => {
	await orderSupplier
		.find()
		.then((data) => {
			res.status(200).send({ data: data });
		})
		.catch((error) => {
			res.status(500).send({ error: error.message });
		});
};

// Get delivery details by user
const getSupplierOrder = async (req, res) => {
	if (req.params && req.params.id) {
		await orderSupplier
			.find({ supplierName: req.params.id })
			.then((data) => {
				res.status(200).send({ data: data });
			})
			.catch((error) => {
				res.status(500).send({ error: error.message });
			});
	}
};

module.exports = {
	createSupplier,
	getAllSupplier,
	getSupplierOrder,
};
