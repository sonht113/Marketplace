const catchAsync = require('../../util/catchAsync');
const {itemService} = require('../services');
const httpStatus = require('http-status');
const ApiError = require('../../util/ApiError');


const createItem = catchAsync(async (req, res) => {
	const item = await itemService.createItem(req.body);
	console.log(req.body);
	res.status(httpStatus.CREATED).send(item);
})

const getItems = catchAsync(async (req, res) => {
  const result = await itemService.queryItems();
  res.send(result);
});

const getItem = catchAsync(async (req, res) => {
	const item = await itemService.getItemById(req.params.itemId);
	if(!item) {
		throw new ApiError(httpStatus.NOT_FOUND, 'item not found');
	}
	res.send(item);
});

const getItemByName = catchAsync(async (req, res) => {
	const item = await itemService.getItemByName(req.query.name);
	console.log(req.query.name);
	res.send(item);
});

const updateItem = catchAsync(async (req, res) => {
	const item = await itemService.updateItemById(req.params.itemId, req.body);
	res.send(item);
});

const deleteItem = catchAsync(async (req, res) => {
	await itemService.deleteItemById(req.params.itemId);
	res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
	createItem,
	getItems,
	getItemByName,
	getItem,
	updateItem,
	deleteItem
}
