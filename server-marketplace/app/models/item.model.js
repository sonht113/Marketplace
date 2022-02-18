const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			trim: true
		},
		price: {
			type: Number,
			require: true,
			trim: true,
		},
		linkImage: {
			type: String,
			require: true,
			trim: true
		},
		addressOwner: {
			type: String,
			require: true,
			trim: true
		},
		purchase: {
			type: Boolean,
			default: false
		}
	}
)

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
