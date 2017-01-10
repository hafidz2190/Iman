var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getGhTransactionCollectionByUser(data)
    {
        var modelName = 'ghTransactionCollection';
        var relatedTableNames = ['user'];
        var forger = null;
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }

    function getPhTransactionCollectionByUser(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['user', 'ghTransaction'];
        var forger = null;
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }

    return {
        getGhTransactionCollectionByUser: getGhTransactionCollectionByUser,
        getPhTransactionCollectionByUser: getPhTransactionCollectionByUser
    };
}

module.exports = managerDefinitions();