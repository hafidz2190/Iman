var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();

router.post('/getCredential', serviceManager.requestHandler); //{email: '', password: ''}
router.post('/getUser', serviceManager.requestHandler); //{email: ''}

module.exports = router;