function userSessionManager() 
{
    var _appConfig = require('../config.json');
    var _dataManager = require('../helpers/dataManager');
    var _errorMessageManager = require('../helpers/errorMessageManager');

    var _userSessionErrorMap = _errorMessageManager.errorMessageMap.userSession;

    function userSessionIsValid(userSessionCollection)
    {
        var userSessions = userSessionCollection.toJSON();

        if(userSessions.length <= 0)
            return false;

        var now = new Date();
        var lastUserSessionDate = userSessions[0].date;
        var timeDiff = Math.abs(now.getTime() - lastUserSessionDate.getTime());

        return timeDiff < _appConfig.userSessionTimeout;
    }

    function validateUserSession(userSessionMap)
    {
        return new Promise((resolve, reject) =>
        {
            userSessionMap.s_session_id = userSessionMap.s_session_id ? userSessionMap.s_session_id : '';
            userSessionMap.s_user_id = userSessionMap.s_user_id ? userSessionMap.s_user_id : '';

            var promise1 = _dataManager.fetchWithRelated('userSessionCollection', ['user'], {where: {id: userSessionMap.s_session_id, s_user_id: userSessionMap.s_user_id}}, [{field: 'date', direction: 'desc'}], 1, 1);

            // get latest user session by session id and user id
            promise1
            .then(function(userSessionCollection)
            {
                if(!userSessionIsValid(userSessionCollection))
                    throw new Error(_userSessionErrorMap.sessionInvalid);
                
                return resolve(true);
            })
            .catch(errorCallback);

            function errorCallback(error)
            {
                return reject(error);
            }
        });        
    }

    return {
        userSessionIsValid: userSessionIsValid,
        validateUserSession: validateUserSession
    };
}

module.exports = userSessionManager();