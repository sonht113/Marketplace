const express = require('express');
const {itemController} = require('../app/controllers');

const router = express.Router();

router.route('/').post(itemController.createItem).get(itemController.getItems);
router.route('/name')
    .get(itemController.getItemByName)


module.exports = router;

