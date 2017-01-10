var businessManagerMap = require('../business/index');

var methodMap = {
    '/getDropdownCollectionByProperty' : businessManagerMap.entityManager.getDropdownCollectionByProperty,
    '/getEntityCollection' : businessManagerMap.entityManager.getEntityCollection,
    '/getPropertyCollectionByEntity' : businessManagerMap.entityManager.getPropertyCollectionByEntity,
    '/getWorkflowStatusCollectionByProperty' : businessManagerMap.entityManager.getWorkflowStatusCollectionByProperty,

    '/getTransactionCollectionByUser' : businessManagerMap.transactionManager.getTransactionCollectionByUser,

    '/getCredential' : businessManagerMap.userManager.getCredential,
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