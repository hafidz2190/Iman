function userManager() 
{
    var _appConfig = requireLocal('config.json');
    var _dataManager = requireLocal('helpers/dataManager');
    var _emailManager = requireLocal('business/emailManager');
    var _encryptionManager = requireLocal('business/encryptionManager');
    var _entityManager = requireLocal('business/entityManager');
    var _enumManager = requireLocal('business/enumManager');
    var _errorMessageManager = requireLocal('business/errorMessageManager');
    var _stringManager = requireLocal('helpers/stringManager');
    var _templateManager = requireLocal('helpers/templateManager');
    var _userSessionManager = requireLocal('business/userSessionManager');

    var _emailSubjectMap = _enumManager.emailSubjectMap;
    var _resetPasswordUrl = _appConfig.resetPasswordUrl;
    var _templatePathMap = _enumManager.templatePathMap;
    var _userErrorMap = _enumManager.errorMessageMap.user;
    var _verifyAccountServiceUrl = _appConfig.verifyAccountServiceUrl;

    function registerUserService(data)
    {
        preValidate();
        sanitizePropertyMap();

        return validatePropertyMap()
        .then(generateHash)
        .then(doProcess);

        function preValidate()
        {
            if(!data.propertyMap.email)
                throw new Error(_errorMessageManager.propertyIsRequired('email'));

            if(!data.propertyMap.password)
                throw new Error(_errorMessageManager.propertyIsRequired('password'));

            if(!data.propertyMap.name)
                throw new Error(_errorMessageManager.propertyIsRequired('name'));
        }

        function sanitizePropertyMap()
        {
            var sanitizedPropertyMap = {};
            sanitizedPropertyMap.owner = _dataManager.generateUuid();
            sanitizedPropertyMap.email = data.propertyMap.email;
            sanitizedPropertyMap.password = data.propertyMap.password;
            sanitizedPropertyMap.name = data.propertyMap.name;
            sanitizedPropertyMap.phone = '';
            sanitizedPropertyMap.bitcoin_address = '';
            sanitizedPropertyMap.activation_id = _dataManager.generateUuid();

            data.propertyMap = sanitizedPropertyMap;
        }

        function validatePropertyMap()
        {
            return _entityManager.validatePropertyMap('user', data.propertyMap);
        }

        function generateHash()
        {
            return _encryptionManager.generateHash(data.propertyMap.password)
            .then(generateHashCallback);

            function generateHashCallback(result)
            {
                data.propertyMap.password = result;
            }            
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
        .then(generateHash)
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

        function generateHash()
        {
            return _encryptionManager.generateHash(data.propertyMap.password)
            .then(generateHashCallback);

            function generateHashCallback(result)
            {
                data.propertyMap.password = result;
            }            
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

    function requestResetPasswordService(data)
    {
        sanitizePropertyMap();

        return doProcess();

        function sanitizePropertyMap()
        {
            var newPropertyMap = {};
            newPropertyMap.email = data.propertyMap.email ? data.propertyMap.email : '';
            newPropertyMap.reset_password_id = _dataManager.generateUuid();

            data.propertyMap = newPropertyMap;
        }

        function doProcess()
        {
            return requestResetPassword(data); 
        }
    }

    function resetPasswordService(data)
    {
        sanitizePropertyMap();

        return generateHash()
        .then(doProcess);

        function sanitizePropertyMap()
        {
            var newPropertyMap = {};
            newPropertyMap.id = data.propertyMap.id ? data.propertyMap.id : '';
            newPropertyMap.reset_password_id = data.propertyMap.reset_password_id ? data.propertyMap.reset_password_id : '';
            newPropertyMap.password = data.propertyMap.password ? data.propertyMap.password : '';

            data.propertyMap = newPropertyMap;
        }

        function generateHash()
        {
            return _encryptionManager.generateHash(data.propertyMap.password)
            .then(generateHashCallback);

            function generateHashCallback(result)
            {
                data.propertyMap.password = result;
            }            
        }

        function doProcess()
        {
            return resetPassword(data); 
        }
    }

    function verifyAccountService(data)
    {
        sanitizePropertyMap();

        return doProcess();

        function sanitizePropertyMap()
        {
            var newPropertyMap = {};
            newPropertyMap.id = data.propertyMap.id ? data.propertyMap.id : '';
            newPropertyMap.activation_id = data.propertyMap.activation_id ? data.propertyMap.activation_id : '';

            data.propertyMap = newPropertyMap;
        }

        function doProcess()
        {
            return verifyAccount(data); 
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
                    var createdUserActivationId = createdUserModel.get('activation_id');
                    var createdUserName = createdUserModel.get('name');
                    var toUpdateUserModel = createdUserModel.toJSON();
                    toUpdateUserModel.owner = createdUserId;

                    var promise3 = _dataManager.save('user', toUpdateUserModel, transactionScope);

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
                            
                            var promise5 = _templateManager.getTemplate(_templatePathMap.user.verification);
                            
                            // get template
                            promise5
                            .then(function(templateResult)
                            {
                                var verifyAccountUrl = _verifyAccountServiceUrl + '?id=' + createdUserId + '&activation_id=' + createdUserActivationId;
                                var body = _stringManager.formatString(templateResult, [createdUserName, verifyAccountUrl]);
                                var subject = _emailSubjectMap.user.verification;

                                var promise6 = _emailManager.createOutgoingEmail(data.propertyMap.email, subject, body, transactionScope);

                                // create outgoing email
                                promise6
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
            .then(function(updatedUserModel)
            {
                var promise2 = _dataManager.fetch('user', {id: updatedUserModel.get('id')}, transactionScope);

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

                var promise2 = _encryptionManager.compareHash(data.propertyMap.password, password);

                // compare password hash
                promise2
                .then(function(passwordMatch)
                {
                    if(!passwordMatch)
                        throw new Error(_userErrorMap.wrongPassword);
                    
                    var promise3 = getUserSessionByUserId(userId, transactionScope);

                    // get user session by user id
                    promise3
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
                        
                        var promise4 = _dataManager.save('userSession', newUserSessionModel, transactionScope);

                        // create user session
                        promise4
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
            })
            .catch(transactionScope.rollback);
        }
    }

    function requestResetPassword(data)
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
                var userName = userModel.get('name');
                var toUpdateUserModel = userModel.toJSON();
                toUpdateUserModel.reset_password_id = data.propertyMap.reset_password_id;

                var promise2 = _dataManager.save('user', toUpdateUserModel, transactionScope);

                // update user
                promise2
                .then(function(updatedUserModel)
                {
                    var promise3 = _templateManager.getTemplate(_templatePathMap.user.resetPassword);

                    // get template
                    promise3
                    .then(function(templateResult)
                    {
                        var resetPasswordUrl = _resetPasswordUrl + '?id=' + userId + '&reset_password_id=' + data.propertyMap.reset_password_id;
                        var body = _stringManager.formatString(templateResult, [userName, resetPasswordUrl]);
                        var subject = _emailSubjectMap.user.resetPassword;

                        var promise4 = _emailManager.createOutgoingEmail(updatedUserModel.get('email'), subject, body, transactionScope);

                        // create outgoing email
                        promise4
                        .then(function()
                        {
                            return new Promise((resolve, reject) =>
                            {
                                return resolve(updatedUserModel);
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
        }
    }

    function resetPassword(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            var promise1 = _dataManager.fetch('user', {id: data.propertyMap.id, reset_password_id: data.propertyMap.reset_password_id}, transactionScope);

            // get user by id and reset password id
            promise1
            .then(function(userModel)
            {
                if(!userModel)
                    throw new Error(_userErrorMap.wrongResetPasswordId);

                var toUpdateUserModel = userModel.toJSON();
                toUpdateUserModel.password = data.propertyMap.password;

                var promise2 = _dataManager.save('user', toUpdateUserModel, transactionScope);

                // update user
                return promise2;
            })
            .then(transactionScope.commit)
            .catch(transactionScope.rollback);
        }
    }

    function verifyAccount(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            var promise1 = _dataManager.fetch('user', {id: data.propertyMap.id, activation_id: data.propertyMap.activation_id}, transactionScope);

            // get user by id and activation id
            promise1
            .then(function(userModel)
            {
                if(!userModel)
                    throw new Error(_userErrorMap.wrongActivationId);

                var toUpdateUserModel = userModel.toJSON();
                toUpdateUserModel.activated = 1;

                var promise2 = _dataManager.save('user', toUpdateUserModel, transactionScope);

                // update user
                return promise2;
            })
            .then(transactionScope.commit)
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
        getCredentialService: getCredentialService,
        requestResetPasswordService: requestResetPasswordService,
        resetPasswordService: resetPasswordService,
        verifyAccountService: verifyAccountService
    };
}

module.exports = userManager();