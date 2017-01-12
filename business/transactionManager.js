var dataManager = require('../helpers/dataManager');
var dataProcessorManager = require('../helpers/dataProcessorManager');

function managerDefinitions() 
{
    function getEwalletCollectionByUser(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['ewallet', 'user'];
        var filterMap = {where: {'user_id': data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize, customCallback);

        function customCallback(result)
        {
            return dataProcessorManager.interimCustomCallback(result, 'phTransaction', 'ewallet', 'ewallets', 'date', false);
        }
    }

    function getGhTransactionCollection(data)
    {
        var modelName = 'ghTransactionCollection';
        var relatedTableNames = ['user'];
        var filterMap = {};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize);
    }

    function getGhTransactionCollectionByUser(data)
    {
        var modelName = 'ghTransactionCollection';
        var relatedTableNames = ['user'];
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize);
    }

    function getManagerTestCollection(data)
    {
        var modelName = 'managerTestCollection';
        var relatedTableNames = ['user'];
        var filterMap = {};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize);
    }

    function getManagerTestCollectionByUser(data)
    {
        var modelName = 'managerTestCollection';
        var relatedTableNames = ['user'];
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize);
    }    

    function getPhTransactionCollection(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['user', 'ghTransaction'];
        var filterMap = {};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize);
    }

    function getPhTransactionCollectionByUser(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['user', 'ghTransaction'];
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize);
    }

    function getTaskCollection(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['task', 'user'];
        var filterMap = {};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize, customCallback);

        function customCallback(result)
        {
            return dataProcessorManager.interimCustomCallback(result, 'phTransaction', 'task', 'tasks', 'date', false);
        }
    }

    function getTaskCollectionByUser(data)
    {
        var modelName = 'phTransactionCollection';
        var relatedTableNames = ['task', 'user'];
        var filterMap = {where: {'user_id': data.user_id}};
        var sortDescriptions = [{field: 'date', direction: 'desc'}];
        var pageSize = null;

        return dataManager.fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize, customCallback);

        function customCallback(result)
        {
            return dataProcessorManager.interimCustomCallback(result, 'phTransaction', 'task', 'tasks', 'date', false);
        }
    }

    return {
        getEwalletCollectionByUser: getEwalletCollectionByUser,
        getGhTransactionCollection: getGhTransactionCollection,
        getGhTransactionCollectionByUser: getGhTransactionCollectionByUser,
        getManagerTestCollection: getManagerTestCollection,
        getManagerTestCollectionByUser: getManagerTestCollectionByUser,
        getPhTransactionCollection: getPhTransactionCollection,
        getPhTransactionCollectionByUser: getPhTransactionCollectionByUser,
        getTaskCollection: getTaskCollection,
        getTaskCollectionByUser: getTaskCollectionByUser
    };
}

module.exports = managerDefinitions();