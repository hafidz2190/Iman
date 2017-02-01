function userManager() 
{
    var _appConfig = require('../config.json');
    var _dataManager = require('../helpers/dataManager');
    var _emailManager = require('../business/emailManager');
    var _entityManager = require('../business/entityManager');
    var _errorMessageManager = require('../helpers/errorMessageManager');

    var _globalErrorMap = _errorMessageManager.errorMessageMap.global;
    var _userManagerErrorMap = _errorMessageManager.errorMessageMap.userManager;

    var _outgoingEmailTemplateTypeMap = _emailManager.getOutgoingEmailTemplateTypeMap();

    function createUserService(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            if(!data.propertyMap.email)
                throw new Error(_userManagerErrorMap.emailIsNull);

            if(!data.propertyMap.password)
                throw new Error(_userManagerErrorMap.passwordIsNull);

            var promise1 = getUserByEmail(data.propertyMap.email, transactionScope);
            
            promise1
            .then(function(model1)
            {
                if(model1)
                    throw new Error(_userManagerErrorMap.emailExist);

                var promise2 = _entityManager.getEntityByName('user', transactionScope);

                promise2
                .then(function(model2)
                {
                    if(!model2)
                        throw new Error(_errorMessageManager.formatError(_globalErrorMap.illegalEntity, ['user']));

                    var entityId = model2.get('id');
                    var promise3 = _entityManager.getPropertyCollectionByEntityId(entityId, transactionScope);

                    promise3
                    .then(function(model3)
                    {
                        var properties = model3.toJSON();
                        _dataManager.validateProperties('user', properties, data.propertyMap);

                        var newUserModel = {
                            date: _dataManager.getDateTimeNow(),
                            email: data.propertyMap.email,
                            password: data.propertyMap.password,
                            name: data.propertyMap.name,
                            phone: data.propertyMap.phone,
                            bitcoin_address: data.propertyMap.bitcoin_address
                        };
                        
                        var promise4 = _dataManager.save('user', newUserModel, transactionScope);

                        promise4
                        .then(function(model4)
                        {
                            var createdUserId = model4.get('id');

                            var newUserSessionModel = {
                                date: _dataManager.getDateTimeNow(),
                                s_user_id: createdUserId
                            };
                            
                            var promise5 = _dataManager.save('userSession', newUserSessionModel, transactionScope);

                            promise5
                            .then(function(model5)
                            {
                                var sessionId = model5.get('id');
                                var promise6 = _emailManager.createOutgoingEmailFromTemplate(data.propertyMap.email, _outgoingEmailTemplateTypeMap.userManager.createUser, transactionScope);

                                promise6
                                .then(function(model6)
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

    function getUserService(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            if(!data.propertyMap.email)
                throw new Error(_userManagerErrorMap.emailIsNull);

            var promise1 = getUserSessionByUserSessionMap(data.userSessionMap, transactionScope);

            promise1
            .then(function(model1)
            {
                var userSessions = model1.toJSON();

                if(userSessions.length <= 0)
                    throw new Error(_globalErrorMap.sessionInvalid);

                var sessionId = userSessions[0].id;
                var lastUserSessionDate = userSessions[0].date;

                if(!userSessionIsValid(lastUserSessionDate))
                    throw new Error(_globalErrorMap.sessionInvalid);

                var promise2 = getUserByEmail(data.propertyMap.email, transactionScope);

                promise2
                .then(function(model2)
                {
                    if(!model2)
                        throw new Error(_userManagerErrorMap.emailNotExist);
                    
                    return new Promise((resolve, reject) =>
                    {
                        return resolve(model2);
                    })
                    .then(transactionScope.commit)
                    .catch(transactionScope.rollback);
                })
            })
            .catch(transactionScope.rollback);
        }
    }

    function getCredentialService(data)
    {
        return _dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            if(!data.propertyMap.email)
                throw new Error(_userManagerErrorMap.emailIsNull);

            if(!data.propertyMap.password)
                throw new Error(_userManagerErrorMap.passwordIsNull);

            var promise1 = getUserByEmail(data.propertyMap.email, transactionScope);
            
            promise1
            .then(function(model1)
            {
                if(!model1)
                    throw new Error(_userManagerErrorMap.emailNotExist);

                var userId = model1.get('id');
                var password = model1.get('password');

                if(data.propertyMap.password != password)
                    throw new Error(_userManagerErrorMap.wrongPassword);

                var promise2 = getUserSessionByUserId(userId, transactionScope);

                promise2
                .then(function(model2)
                {
                    var userSessions = model2.toJSON();

                    if(userSessions.length > 0)
                    {
                        var sessionId = userSessions[0].id;
                        var lastUserSessionDate = userSessions[0].date;

                        if(userSessionIsValid(lastUserSessionDate))
                        {
                            return new Promise((resolve, reject) =>
                            {
                                return resolve({s_user_id: userId, s_session_id: sessionId});
                            })
                            .then(transactionScope.commit)
                            .catch(transactionScope.rollback);
                        }
                    }

                    var newUserSessionModel = {
                        date: _dataManager.getDateTimeNow(),
                        s_user_id: userId
                    };
                    
                    var promise3 = _dataManager.save('userSession', newUserSessionModel, transactionScope);

                    promise3
                    .then(function(model3)
                    {
                        var createdUserSessionId = model3.get('id');
                        
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

    function getUserSessionByUserSessionMap(userSessionMap, transactionScope)
    {
        return _dataManager.fetchWithRelated('userSessionCollection', ['user'], {where: {id: userSessionMap.s_session_id, s_user_id: userSessionMap.s_user_id}}, [{field: 'date', direction: 'desc'}], 1, 1, transactionScope);
    }

    function userSessionIsValid(lastUserSessionDate)
    {
        var now = new Date();
        var timeDiff = Math.abs(now.getTime() - lastUserSessionDate.getTime());

        return timeDiff < _appConfig.userSessionTimeout;
    }

    return {
        createUserService: createUserService,
        getUserService: getUserService,
        getCredentialService: getCredentialService
    };
}

module.exports = userManager();