const catchAsync = require('../../util/catchAsync');
const {userService} = require('../services');
const httpStatus = require('http-status');
const ApiError = require('../../util/ApiError');

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
})

const getUsers = catchAsync(async(req, res) => {
    const result = await userService.queryUsers();
    res.send(result);
})

module.exports = {
    createUser,
    getUsers
}
