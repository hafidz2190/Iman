var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getTransactionCollectionByUser(data)
    {
        var modelName = 'transactionCollection';
        var relatedTableNames = ['user'];
        var forger = null;
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions =  null;
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }

    return {
        getTransactionCollectionByUser: getTransactionCollectionByUser
    };
}

module.exports = managerDefinitions();