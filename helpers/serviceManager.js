function serviceManager()
{
    var _serviceMap = requireLocal('services/index');

    var _methodMap = {
        '/user/registerUser': {method: _serviceMap.userService.registerUserService, serializer: 2},
        '/user/createUser': {method: _serviceMap.userService.createUserService, serializer: 2},
        '/user/getUser': {method: _serviceMap.userService.getUserService, serializer: 3},
        '/user/updateUser': {method: _serviceMap.userService.updateUserService, serializer: 3},
        '/user/getCredential': {method: _serviceMap.userService.getCredentialService, serializer: 2},
        '/user/requestResetPassword': {method: _serviceMap.userService.requestResetPasswordService, serializer: 3},
        '/user/resetPassword': {method: _serviceMap.userService.resetPasswordService, serializer: 3},
        '/user/verifyAccount': {method: _serviceMap.userService.verifyAccountService, serializer: 2}
    };

    function requestHandler(req, res, next)
    {
        var url = req.baseUrl + req.route.path;
        var method = _methodMap[url].method;
        var serializer = defaultSerializer;
        var data = req.body;
        data = sanitizeRequestParam(data);

        if(req.method == 'GET')
            data.propertyMap = req.query;

        switch (_methodMap[url].serializer) 
        {
            case 1:
                serializer = collectionSerializer
                break;
            case 3:
                serializer = modelSerializer
                break;
            default:
                serializer = defaultSerializer;
                break;
        }

        method(data)
            .then(serializer)
            .then(successCallback)
            .catch(errorCallback);

        function successCallback(result)
        {
            res.send(result);
        }

        function errorCallback(result)
        {
            next(result);
        }
    }
    
    function collectionSerializer(result)
    {
        return new Promise((resolve, reject) =>
        {
            if(!result)
                return resolve({data: []});

            return resolve({data: result.toJSON()});
        });
    }

    function defaultSerializer(result)
    {
        return new Promise((resolve, reject) =>
        {
            if(!result)
                return resolve({data: []});

            return resolve({data: [result]});
        });
    }

    function modelSerializer(result)
    {
        return new Promise((resolve, reject) =>
        {
            if(!result)
                return resolve({data: []});

            return resolve({data: [result.toJSON()]});
        });
    }

    function sanitizeRequestParam(data)
    {
        if(!('queryConfig' in data))
            data.queryConfig = {};

        if(!('propertyMap' in data))
            data.propertyMap = {};

        if(!('userSessionMap' in data))
            data.userSessionMap = {};

        return data;
    }
    
    return {
        requestHandler: requestHandler
    };
}

module.exports = serviceManager();