function serviceManager()
{
    var _serviceMap = require('../services/index');

    var _methodMap = {
        '/createUser': {method: _serviceMap.userService.createUserService, serializer: 2},
        '/getUser': {method: _serviceMap.userService.getUserService, serializer: 3},
        '/getCredential': {method: _serviceMap.userService.getCredentialService, serializer: 2}
    };

    function requestHandler(req, res, next)
    {
        var method = _methodMap[req.url].method;
        var serializer = defaultSerializer;
        var data = req.body;
        data = sanitizeRequestParam(data);

        switch (_methodMap[req.url].serializer) 
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