const httpStatus = require('http-status');
const {User} = require('../models');
const ApiError = require('../../util/ApiError');

const createUser = async (userBody) => {
	console.log(userBody);
    return User.create(userBody);
}

const queryUsers = async () => {
    const users = await User.find();
    return users;
}

module.exports = {
    createUser,
    queryUsers
}
