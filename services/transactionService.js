var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();
var requestHandler = serviceManager.requestHandler;

router.post('/getEwalletCollectionByUser', requestHandler); //{user_id: ''}
router.post('/getGhTransactionCollectionByUser', requestHandler); //{user_id: ''}
router.post('/getPhTransactionCollectionByUser', requestHandler); //{user_id: ''}

module.exports = router;