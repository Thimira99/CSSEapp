const mongoose = require('mongoose');

//db connection URL
const dbURI =
	'mongodb+srv://teamJDI_CSSE_3_2GrpProject:weareteamjdi3.2@cssecluster.urgl7ng.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
	await mongoose.connect(
		dbURI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(error) => {
			if (error) {
				console.log('Database Error: ', error.message);
			}
		}
	);

	//check db is connect successfully
	mongoose.connection.once('open', () => {
		console.log('Database connected.');
	});
};

module.exports = connectDB;
