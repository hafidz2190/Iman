var businessManagerMap = require('../business/index');

var methodMap = {
    '/getDropdownCollectionByProperty' : businessManagerMap.entityManager.getDropdownCollectionByProperty,
    '/getEntityCollection' : businessManagerMap.entityManager.getEntityCollection,
    '/getPropertyCollectionByEntity' : businessManagerMap.entityManager.getPropertyCollectionByEntity,
    '/getWorkflowStatusCollectionByProperty' : businessManagerMap.entityManager.getWorkflowStatusCollectionByProperty,

    '/getHistoryCollectionByPropertyAndUser' : businessManagerMap.historyManager.getHistoryCollectionByPropertyAndUser,
    '/getHistoryCollectionByReference' : businessManagerMap.historyManager.getHistoryCollectionByReference,

    '/getEwalletCollectionByUser' : businessManagerMap.transactionManager.getEwalletCollectionByUser,
    '/getGhTransactionCollection' : businessManagerMap.transactionManager.getGhTransactionCollection,
    '/getGhTransactionCollectionByUser' : businessManagerMap.transactionManager.getGhTransactionCollectionByUser,
    '/getPhTransactionCollection' : businessManagerMap.transactionManager.getPhTransactionCollection,
    '/getPhTransactionCollectionByUser' : businessManagerMap.transactionManager.getPhTransactionCollectionByUser,
    '/getTaskCollection' : businessManagerMap.transactionManager.getTaskCollection,
    '/getTaskCollectionByUser' : businessManagerMap.transactionManager.getTaskCollectionByUser,

    '/getCredential' : businessManagerMap.userManager.getCredential,
    '/getUser' : businessManagerMap.userManager.getUser,
    '/getUserCollection' : businessManagerMap.userManager.getUserCollection,
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