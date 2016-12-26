var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();
var requestHandler = serviceManager.requestHandler;

router.post('/getTransactionsByUser', requestHandler); //{user_id: ''}

module.exports = router;