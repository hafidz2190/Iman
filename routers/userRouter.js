function userRouter()
{
    var _express = require('express');
    var _serviceManager = require('../helpers/serviceManager');

    var _router = _express.Router();
    var _requestHandler = _serviceManager.requestHandler;

    _router.post('/createUser', _requestHandler);
    _router.post('/getUser', _requestHandler);
    _router.post('/getCredential', _requestHandler);

    return _router;
}

module.exports = userRouter();