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
            var formattedResult = [];

            for(var i = 0, ii = result.data.length; i < ii; i++)
            {
                var phTransactionItem = result.data[i];
                var ewallets = phTransactionItem.ewallet;
                var formattedResultPerBatch = [];
                var formattedResultPerBatchSorted = [];

                for(var j = 0, jj = ewallets.length; j < jj; j++)
                {
                    var ewalletItem = {};
                    ewalletItem = ewallets[j];
                    ewalletItem['phTransaction'] = {};

                    for(var property in phTransactionItem)
                    {
                        if(property == 'ewallet' || property == 'id')
                            continue;
                        
                        ewalletItem['phTransaction'][property] = phTransactionItem[property];
                    }

                    formattedResultPerBatch.push(ewalletItem);
                }

                formattedResultPerBatchSorted = dataProcessorManager.quickSort(formattedResultPerBatch, 0, formattedResultPerBatch.length - 1, 'date');

                for(var j = 0, jj = formattedResultPerBatchSorted.length; j < jj; j++)
                    formattedResult.push(formattedResultPerBatchSorted[j]);
            }
            
            return formattedResult;
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

    return {
        getEwalletCollectionByUser: getEwalletCollectionByUser,
        getGhTransactionCollectionByUser: getGhTransactionCollectionByUser,
        getPhTransactionCollectionByUser: getPhTransactionCollectionByUser
    };
}

module.exports = managerDefinitions();