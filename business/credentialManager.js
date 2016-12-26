var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getCredential(data)
    {
        var tableName = 'user';
        var filterMap = {email: data.email, password: data.password};

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
    
    return {
        getCredential: getCredential
    };
}

module.exports = managerDefinitions();