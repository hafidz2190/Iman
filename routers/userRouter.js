function userRouter()
{
    var _serviceManager = requireLocal('helpers/serviceManager');

    var _express = require('express');

    var _router = _express.Router();
    var _requestHandler = _serviceManager.requestHandler;

    _router.post('/registerUser', _requestHandler);
    _router.post('/getUser', _requestHandler);
    _router.post('/updateUser', _requestHandler);
    _router.post('/getCredential', _requestHandler);
    _router.post('/requestResetPassword', _requestHandler);
    _router.post('/resetPassword', _requestHandler);
    _router.get('/verifyAccount', _requestHandler);

    return _router;
}

module.exports = userRouter();