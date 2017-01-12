var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();
var requestHandler = serviceManager.requestHandler;

router.post('/createManagerTest', requestHandler); //{date: '', status: '', user_id: ''}
router.post('/getEwalletCollectionByUser', requestHandler); //{user_id: ''}
router.post('/getGhTransactionCollection', requestHandler); //{}
router.post('/getGhTransactionCollectionByUser', requestHandler); //{user_id: ''}
router.post('/getManagerTestCollection', requestHandler); //{}
router.post('/getManagerTestCollectionByUser', requestHandler); //{user_id: ''}
router.post('/getPhTransactionCollection', requestHandler); //{}
router.post('/getPhTransactionCollectionByUser', requestHandler); //{user_id: ''}
router.post('/getTaskCollection', requestHandler); //{}
router.post('/getTaskCollectionByUser', requestHandler); //{user_id: ''}

module.exports = router;