var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();
var requestHandler = serviceManager.requestHandler;

router.post('/getCredential', requestHandler); //{email: '', password: ''}
router.post('/getUser', requestHandler); //{email: ''}
router.post('/getUserCollection', requestHandler); //{}
router.post('/getUserSession', requestHandler); //{user_id: ''}

module.exports = router;