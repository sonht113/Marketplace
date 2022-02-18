const express = require('express');
const router = express.Router();
const { userController } = require('../app/controllers');

router.route('/').post(userController.createUser).get(userController.getUsers);

module.exports = router;
