var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getTransactionsByUser(data)
    {
        var tableName = 'transactions';
        var relatedTableNames = ['user', 'transactionType'];
        var forger = null;
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions =  null;
        var pageSize = null;

        return dataManager.fetchWithRelated(tableName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize, callback);

        function callback(results)
        {
            if(results.length <= 0)
                return {
                    data: []
                };
            
            return {
                data: results
            };
        }
    }

    return {
        getTransactionsByUser: getTransactionsByUser
    };
}

module.exports = managerDefinitions();