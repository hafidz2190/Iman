var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getUser(data)
    {
        var tableName = 'user';
        var filterMap = {email: data.email};

        return dataManager.fetch(tableName, filterMap, callback);

        function callback(results)
        {
            if(results.length <= 0)
                return {
                    data: null
                };
            
            return {
                data: results[0]
            };
        }
    }

    function getUserSession(data)
    {
        var tableName = 'userSessions';
        var relatedTableNames = ['user'];
        var forger = null;
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions =  [{field: 'date', direction: 'desc'}];
        var pageSize = 1

        return dataManager.fetchWithRelated(tableName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize, callback);

        function callback(results)
        {
            if(results.length <= 0)
                return {
                    data: null
                };
            
            return {
                data: results[0]
            };
        }
    }
    
    return {
        getUser: getUser,
        getUserSession: getUserSession
    };
}

module.exports = managerDefinitions();