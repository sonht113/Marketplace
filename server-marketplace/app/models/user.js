const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			trim: true
		},
		password: {
			type: String,
			require: true,
			trim: true,
			minlength: 6
		},
		addressOwner: {
			type: String,
			require: true,
			trim: true
		}
	}
)

const User = mongoose.model('User', userSchema);

module.exports = User;
