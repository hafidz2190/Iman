var dataManager = require('../helpers/dataManager');
var dataProcessorManager = require('../helpers/dataProcessorManager');

function managerDefinitions() 
{
    function getEwalletCollectionByUser(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['ewallet', 'user'];
        var forger = null;
        var filterMap = {where: {'user_id': data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize, customCallback);

        function customCallback(result)
        {
            return dataProcessorManager.interimCustomCallback(result, 'phTransaction', 'ewallet', 'ewallets', 'date', false);
        }
    }

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

    function getTaskCollectionByUser(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['task', 'user'];
        var forger = null;
        var filterMap = {where: {'user_id': data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize, customCallback);

        function customCallback(result)
        {
            return dataProcessorManager.interimCustomCallback(result, 'phTransaction', 'task', 'tasks', 'date', false);
        }
    }

    return {
        getEwalletCollectionByUser: getEwalletCollectionByUser,
        getGhTransactionCollectionByUser: getGhTransactionCollectionByUser,
        getPhTransactionCollectionByUser: getPhTransactionCollectionByUser,
        getTaskCollectionByUser: getTaskCollectionByUser
    };
}

module.exports = managerDefinitions();