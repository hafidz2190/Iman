var businessManagerMap = require('../business/index');

var methodMap = {
    '/getCredential' : businessManagerMap.credentialManager.getCredential,
    '/getTransactionsByUser' : businessManagerMap.transactionManager.getTransactionsByUser,
    '/getUser' : businessManagerMap.userManager.getUser,
    '/getUserSession' : businessManagerMap.userManager.getUserSession
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