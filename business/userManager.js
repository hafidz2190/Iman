var dataManager = require('../helpers/dataManager');

function managerDefinitions() 
{
    function getUser(data)
    {
        return dataManager.fetch('users', {email: data.email}, callback);

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
        getUser: getUser
    };
}

module.exports = managerDefinitions();