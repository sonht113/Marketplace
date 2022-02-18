const httpStatus = require('http-status');
const {Item} = require('../models');
const ApiError = require('../../util/ApiError');

/**
 * Create a item 
 * @param {Object} itemBody
 * @return {Promise<Item}
 */

const createItem = async (itemBody) => {
	console.log(itemBody);
	return Item.create(itemBody);
}

/**
 * Query for books
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryItems = async () => {
	const items = await Item.find();
	return items;
};

/**
 * Get item by id
 * @param {ObjectId} id
 * @returns {Promise<Item>}
 */
const getItemById = async (id) => {
	return Item.findById(id);
};

/**
 * Get item by name
 * @param {ObjectId} id
 * @returns {Promise<Item>}
 */
 const getItemByName = async (name) => {
	return Item.findOne({name});
};


/**
 * Update item by id
 * @param {ObjectId} itemId
 * @param {Object} updateBody
 * @returns {Promise<Item>}
 */
const updateItemById = async (itemId, updateBody) => {
	const item = await getBookById(itemId);
	if (!item) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
	}
	Object.assign(item, updateBody);
	await item.save();
	return item;
};

/**
 * Delete item by id
 * @param {ObjectId} itemId
 * @returns {Promise<Item>}
 */
const deleteItemById = async (itemId) => {
	const item = await getItemById(itemId);
	if (!item) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
	}
	await item.remove();
	return item;
};

module.exports = {
	createItem,
	queryItems,
	getItemById,
	getItemByName,
	updateItemById,
	deleteItemById,
};
