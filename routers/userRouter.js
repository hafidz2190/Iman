var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();
var requestHandler = serviceManager.requestHandler;

router.post('/createUser', requestHandler);
router.post('/getUser', requestHandler);
router.post('/getCredential', requestHandler);

module.exports = router;