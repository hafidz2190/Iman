var businessManagerMap = require('../business/index');

var methodMap = {
    '/getCredential' : businessManagerMap.credentialManager.getCredential,
    '/getUser' : businessManagerMap.userManager.getUser
};

function managerDefinitions() 
{
    function requestHandler(req, res)
    {
        methodMap[req.url](req.body).then(callback);

        function callback(result)
        {
            res.send(result);
        }
    }
    
    return {
        requestHandler: requestHandler
    };
}

module.exports = managerDefinitions();