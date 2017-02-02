function userManager() 
{
    var _dataManager = require('../helpers/dataManager');
    var _emailManager = require('../business/emailManager');
    var _entityManager = require('../business/entityManager');
    var _errorMessageManager = require('../helpers/errorMessageManager');
    var _userSessionManager = require('../business/userSessionManager');

    var _userErrorMap = _errorMessageManager.errorMessageMap.user;
    var _outgoingEmailTemplateTypeMap = _emailManager.getOutgoingEmailTemplateTypeMap();

    function registerUserService(data)
    {
        preValidate();
        sanitizePropertyMap();

        return validatePropertyMap()
        .then(doProcess);

        function preValidate()
        {
            if(!data.propertyMap.email)
                throw new Error(_errorMessageManager.propertyIsRequired('email'));

            if(!data.propertyMap.password)
                throw new Error(_errorMessageManager.propertyIsRequired('password'));
        }

        function sanitizePropertyMap()
        {
            var sanitizedPropertyMap = {};
            sanitizedPropertyMap.owner = _dataManager.generateUuid();
            sanitizedPropertyMap.email = data.propertyMap.email;
            sanitizedPropertyMap.password = data.propertyMap.password;
            sanitizedPropertyMap.name = '';
            sanitizedPropertyMap.phone = '';
            sanitizedPropertyMap.bitcoin_address = '';

            data.propertyMap = sanitizedPropertyMap;
        }

        function validatePropertyMap()
        {
            return _entityManager.validatePropertyMap('user', data.propertyMap);
        }

        function doProcess()
        {
            return createUser(data); 
        }
    }

    function getUserService(data)
    {
        preValidate();
        sanitizePropertyMap();

        return validatePropertyMap()
        .then(validateUserSession)
        .then(doProcess);

        function preValidate()
        {
            if(!data.propertyMap.email)
                throw new Error(_errorMessageManager.propertyIsRequired('email'));
        }

        function sanitizePropertyMap()
        {
            var sanitizedPropertyMap = {};
            sanitizedPropertyMap.email = data.propertyMap.email;

            data.propertyMap = sanitizedPropertyMap;
        }

        function validatePropertyMap()
        {
            return _entityManager.validatePropertyMap('user', data.propertyMap);
        }

        function validateUserSession()
        {
            return _userSessionManager.validateUserSession(data.userSessionMap);
        }

        function doProcess()
        {
            return getUser(data); 
        }
    }

    function updateUserService(data)
    {
        sanitizePropertyMap();

        return validatePropertyMap()
        .then(validateUserSession)
        .then(validateAuthorization)
        .then(upgradeVersion)
        .then(doProcess);

        function sanitizePropertyMap()
        {
            data.propertyMap.id = data.propertyMap.id ? data.propertyMap.id : '';
            data.propertyMap.version = data.propertyMap.version ? data.propertyMap.version : '';
        }

        function validatePropertyMap()
        {
            return _entityManager.validatePropertyMap('user', data.propertyMap);
        }

        function validateUserSession()
        {
            return _userSessionManager.validateUserSession(data.userSessionMap);
        }

        function validateAuthorization()
        {
            return _entityManager.validateAuthorization('user', data.propertyMap.id, data.propertyMap.version, data.userSessionMap.s_user_id);
        }

        function upgradeVersion()
        {
            data.propertyMap.version = _entityManager.upgradeVersion(data.propertyMap.version);
        }

        function doProcess()
        {
            return updateUser(data); 
        }
    }

    function getCredentialService(data)
    {
        preValidate();
        sanitizePropertyMap();

        return validatePropertyMap()
        .then(doProcess);

        function preValidate()
        {
            if(!data.propertyMap.email)
                throw new Error(_errorMessageManager.propertyIsRequired('email'));

            if(!data.propertyMap.password)
                throw new Error(_errorMessageManager.propertyIsRequired('password'));
        }

        function sanitizePropertyMap()
        {
            var sanitizedPropertyMap = {};
            sanitizedPropertyMap.email = data.propertyMap.email;
            sanitizedPropertyMap.password = data.propertyMap.password;

            data.propertyMap = sanitizedPropertyMap;
        }

        function validatePropertyMap()
        {
            return _entityManager.validatePropertyMap('user', data.propertyMap);
        }

        function doProcess()
        {
            return getCredential(data); 
        }
    }

    function createUser(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            var promise1 = getUserByEmail(data.propertyMap.email, transactionScope);
            
            // get user by email
            promise1
            .then(function(userModel)
            {
                if(userModel)
                    throw new Error(_userErrorMap.emailExist);

                var promise2 = _dataManager.save('user', data.propertyMap, transactionScope);

                // create user
                promise2
                .then(function(createdUserModel)
                {
                    var createdUserId = createdUserModel.get('id');
                    var modifiedCreatedUserModel = createdUserModel.toJSON();
                    modifiedCreatedUserModel.owner = createdUserId;

                    var promise3 = _dataManager.save('user', modifiedCreatedUserModel, transactionScope);

                    // update user owner to match with its id
                    promise3
                    .then(function()
                    {
                        var newUserSessionModel = {
                            s_user_id: createdUserId
                        };
                        
                        var promise4 = _dataManager.save('userSession', newUserSessionModel, transactionScope);

                        // create user session
                        promise4
                        .then(function(userSessionModel)
                        {
                            var sessionId = userSessionModel.get('id');
                            var promise5 = _emailManager.createOutgoingEmailFromTemplate(data.propertyMap.email, _outgoingEmailTemplateTypeMap.userManager.createUser, transactionScope);

                            // create outgoing email
                            promise5
                            .then(function()
                            {
                                return new Promise((resolve, reject) =>
                                {
                                    return resolve({s_user_id: createdUserId, s_session_id: sessionId});
                                })
                                .then(transactionScope.commit)
                                .catch(transactionScope.rollback);
                            })
                            .catch(transactionScope.rollback);
                        })
                        .catch(transactionScope.rollback);
                    })
                    .catch(transactionScope.rollback);
                })
                .catch(transactionScope.rollback);
            })
            .catch(transactionScope.rollback);
        }
    }

    function getUser(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            var promise1 = getUserByEmail(data.propertyMap.email, transactionScope);

            // get user by email
            promise1
            .then(function(userModel)
            {
                if(!userModel)
                    throw new Error(_userErrorMap.emailNotExist);
                
                return new Promise((resolve, reject) =>
                {
                    return resolve(userModel);
                })
                .then(transactionScope.commit)
                .catch(transactionScope.rollback);
            })
            .catch(transactionScope.rollback);
        }
    }

    function updateUser(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            var promise1 = _dataManager.save('user', data.propertyMap, transactionScope);

            // update user
            promise1
            .then(function(userModel)
            {
                var promise2 = _dataManager.fetch('user', {id: userModel.get('id')}, transactionScope);

                // fetch updated user
                return promise2;
            })
            .then(transactionScope.commit)
            .catch(transactionScope.rollback);
        }
    }

    function getCredential(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            var promise1 = getUserByEmail(data.propertyMap.email, transactionScope);
            
            // get user by email
            promise1
            .then(function(userModel)
            {
                if(!userModel)
                    throw new Error(_userErrorMap.emailNotExist);

                var userId = userModel.get('id');
                var password = userModel.get('password');

                if(data.propertyMap.password != password)
                    throw new Error(_userErrorMap.wrongPassword);

                var promise2 = getUserSessionByUserId(userId, transactionScope);

                // get user session by user id
                promise2
                .then(function(userSessionCollection)
                {
                    if(_userSessionManager.userSessionIsValid(userSessionCollection))
                    {
                        var userSessions = userSessionCollection.toJSON();
                        var sessionId = userSessions[0].id;
                        
                        return new Promise((resolve, reject) =>
                        {
                            return resolve({s_user_id: userId, s_session_id: sessionId});
                        })
                        .then(transactionScope.commit)
                        .catch(transactionScope.rollback);                        
                    }

                    var newUserSessionModel = {
                        s_user_id: userId
                    };
                    
                    var promise3 = _dataManager.save('userSession', newUserSessionModel, transactionScope);

                    // create user session
                    promise3
                    .then(function(createdUserSessionModel)
                    {
                        var createdUserSessionId = createdUserSessionModel.get('id');
                        
                        return new Promise((resolve, reject) =>
                        {
                            return resolve({s_user_id: userId, s_session_id: createdUserSessionId});
                        });
                    })
                    .then(transactionScope.commit)
                    .catch(transactionScope.rollback);
                })
                .catch(transactionScope.rollback);
            })
            .catch(transactionScope.rollback);
        }
    }

    function getUserByEmail(email, transactionScope)
    {
        return _dataManager.fetch('user', {email: email}, transactionScope);
    }

    function getUserSessionByUserId(userId, transactionScope)
    {
        return _dataManager.fetchWithRelated('userSessionCollection', ['user'], {where: {s_user_id: userId}}, [{field: 'date', direction: 'desc'}], 1, 1, transactionScope);
    }

    return {
        registerUserService: registerUserService,
        getUserService: getUserService,
        updateUserService: updateUserService,
        getCredentialService: getCredentialService
    };
}

module.exports = userManager();