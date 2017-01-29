var appConfig = require('../config.json');
var dataManager = require('../helpers/dataManager');
var entityManager = require('../business/entityManager');
var errorMessageManager = require('../helpers/errorMessageManager');
var emailManager = require('../business/emailManager');

var globalError = errorMessageManager.global;
var userManagerError = errorMessageManager.userManager;

var outgoingEmailTemplateTypeMap = emailManager.getOutgoingEmailTemplateTypeMap();

function managerDefinitions() 
{
    function createUserService(data)
    {
        return dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            if(!data.propertyMap.email)
                throw new Error(userManagerError.emailIsNull);

            if(!data.propertyMap.password)
                throw new Error(userManagerError.passwordIsNull);

            var promise1 = getUserByEmail(data.propertyMap.email, transactionScope);
            
            promise1
            .then(function(model1)
            {
                if(model1)
                    throw new Error(userManagerError.emailExist);

                var promise2 = entityManager.getEntityByName('user', transactionScope);

                promise2
                .then(function(model2)
                {
                    var entityId = model2.get('id');
                    var promise3 = entityManager.getPropertyCollectionByEntityId(entityId, transactionScope);

                    promise3
                    .then(function(model3)
                    {
                        var properties = model3.toJSON();
                        dataManager.validateProperties('user', properties, data.propertyMap);

                        var newUserModel = {
                            date: dataManager.getDateTimeNow(),
                            email: data.propertyMap.email,
                            password: data.propertyMap.password,
                            name: data.propertyMap.name,
                            phone: data.propertyMap.phone,
                            bitcoin_address: data.propertyMap.bitcoin_address
                        };
                        
                        var promise4 = dataManager.save('user', newUserModel, transactionScope);

                        promise4
                        .then(function(model4)
                        {
                            var createdUserId = model4.get('id');

                            var newUserSessionModel = {
                                date: dataManager.getDateTimeNow(),
                                user_id: createdUserId
                            };
                            
                            var promise5 = dataManager.save('userSession', newUserSessionModel, transactionScope);

                            promise5
                            .then(function(model5)
                            {
                                var promise6 = emailManager.createOutgoingEmailFromTemplate(data.propertyMap.email, outgoingEmailTemplateTypeMap.userManager.createUser, transactionScope);

                                promise6
                                .then(function(model6)
                                {
                                    var promise7 = getUserByEmail(data.propertyMap.email, transactionScope);

                                    return promise7;
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

    function getUserService(data)
    {
        return dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            if(!data.propertyMap.email)
                throw new Error(userManagerError.emailIsNull);

            var promise1 = getUserSessionByUserSessionMap(data.userSessionMap, transactionScope);

            promise1
            .then(function(model1)
            {
                var userSessions = model1.toJSON();

                if(userSessions.length <= 0)
                    throw new Error(globalError.sessionInvalid);

                var sessionId = userSessions[0].id;
                var lastUserSessionDate = userSessions[0].date;

                if(!userSessionIsValid(lastUserSessionDate))
                    throw new Error(globalError.sessionInvalid);

                var promise2 = getUserByEmail(data.propertyMap.email, transactionScope);

                promise2
                .then(function(model2)
                {
                    if(!model2)
                        throw new Error(userManagerError.emailNotExist);
                    
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
        return dataManager.processTransaction(transaction);

        function transaction(transactionScope)
        {
            if(!data.propertyMap.email)
                throw new Error(userManagerError.emailIsNull);

            if(!data.propertyMap.password)
                throw new Error(userManagerError.passwordIsNull);

            var promise1 = getUserByEmail(data.propertyMap.email, transactionScope);
            
            promise1
            .then(function(model1)
            {
                if(!model1)
                    throw new Error(userManagerError.emailNotExist);

                var userId = model1.get('id');
                var password = model1.get('password');

                if(data.propertyMap.password != password)
                    throw new Error(userManagerError.wrongPassword);

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
                                return resolve({user_id: userId, session_id: sessionId});
                            })
                            .then(transactionScope.commit)
                            .catch(transactionScope.rollback);
                        }
                    }

                    var newUserSessionModel = {
                        date: dataManager.getDateTimeNow(),
                        user_id: userId
                    };
                    
                    var promise3 = dataManager.save('userSession', newUserSessionModel, transactionScope);

                    promise3
                    .then(function(model3)
                    {
                        var createdUserSessionId = model3.get('id');
                        
                        return new Promise((resolve, reject) =>
                        {
                            return resolve({user_id: userId, session_id: createdUserSessionId});
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
        return dataManager.fetch('user', {email: email}, transactionScope);
    }

    function getUserSessionByUserId(userId, transactionScope)
    {
        return dataManager.fetchWithRelated('userSessionCollection', ['user'], {where: {user_id: userId}}, [{field: 'date', direction: 'desc'}], 1, 1, transactionScope);
    }

    function getUserSessionByUserSessionMap(userSessionMap, transactionScope)
    {
        return dataManager.fetchWithRelated('userSessionCollection', ['user'], {where: {id: userSessionMap.session_id, user_id: userSessionMap.user_id}}, [{field: 'date', direction: 'desc'}], 1, 1, transactionScope);
    }

    function userSessionIsValid(lastUserSessionDate)
    {
        var now = new Date();
        var timeDiff = Math.abs(now.getTime() - lastUserSessionDate.getTime());

        return timeDiff < appConfig.userSessionTimeout;
    }

    return {
        createUserService: createUserService,
        getUserService: getUserService,
        getCredentialService: getCredentialService
    };
}

module.exports = managerDefinitions();