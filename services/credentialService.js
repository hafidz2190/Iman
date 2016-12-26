var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();
var requestHandler = serviceManager.requestHandler;

router.post('/getCredential', requestHandler); //{email: '', password: ''}

module.exports = router;