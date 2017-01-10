var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getCredential(data)
    {
        var modelName = 'user';
        var filterMap = {email: data.email, password: data.password};

        return dataManager.fetch(modelName, filterMap);
    }

    function getUser(data)
    {
        var modelName = 'user';
        var filterMap = {email: data.email};

        return dataManager.fetch(modelName, filterMap);
    }

    function getUserSession(data)
    {
        var modelName = 'userSessionCollection';
        var relatedTableNames = ['user'];
        var forger = null;
        var filterMap = {where: {user_id: data.user_id}};
        var sortDescriptions =  [{field: 'date', direction: 'desc'}];
        var pageSize = 1

        return dataManager.fetchWithRelated(modelName, relatedTableNames, forger, filterMap, sortDescriptions, pageSize);
    }
    
    return {
        getCredential: getCredential,
        getUser: getUser,
        getUserSession: getUserSession
    };
}

module.exports = managerDefinitions();