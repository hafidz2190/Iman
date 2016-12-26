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

        // function callback(results)
        // {
        //     var email = data.email;
        //     var password = data.password;
        //     var rows = results;

        //     var matched = false;

        //     for(var i = 0, ii = rows.length; i < ii; i++)
        //     {
        //         var row = rows[i];
        //         var currentEmail = row['email'];
        //         var currentPassword = row['password'];

        //         if(email != currentEmail || password != currentPassword)
        //             continue;

        //         matched = true;
        //         break;
        //     }

        //     return {
        //         data: matched
        //     };            
        // }
    }
    
    return {
        getCredential: getCredential
    };
}

module.exports = managerDefinitions();