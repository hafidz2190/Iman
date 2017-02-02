function entityManager() 
{
    var _dataManager = require('../helpers/dataManager');
    var _errorMessageManager = require('../helpers/errorMessageManager');

    var _entityErrorMap = _errorMessageManager.errorMessageMap.entity;
    var _systemPropertyMap = {
        'id': true,
        'version': true,
        'date': true,
        'owner': true
    };

    function upgradeVersion(version)
    {
        return parseInt(version) + 1;
    }

    function validateAuthorization(entityName, id, version, userId)
    {
        return new Promise((resolve, reject) =>
        {
            var promise1 = _dataManager.fetch(entityName, {id: id});

            // get model by entity name and id
            promise1
            .then(function(model)
            {
                if(!model)
                    throw new Error(_entityErrorMap.recordNotExist);
                
                var owner = model.get('owner');
                var isAdmin = model.get('is_admin');
                var isActive = model.get('is_active');
                var activated = model.get('activated');

                if(version && version != model.get('version'))
                    throw new Error(_entityErrorMap.versionInvalid);

                if(!isAdmin && userId && userId != owner)
                    throw new Error(_entityErrorMap.notAuthorized);

                if(!isActive)
                    throw new Error(_entityErrorMap.notAuthorized);

                if(!activated)
                    throw new Error(_entityErrorMap.notAuthorized);

                return resolve(true);
            })
            .catch(errorCallback);

            function errorCallback(error)
            {
                return reject(error);
            }
        });
    }

    function validatePropertyMap(entityName, propertyMap)
    {
        return new Promise((resolve, reject) =>
        {
            var promise1 = _dataManager.fetch('entity', {name: entityName});

            // get entity by name
            promise1
            .then(function(entityModel)
            {
                if(!entityModel)
                    throw new Error(_errorMessageManager.formatError(_entityErrorMap.illegalEntity, [entityName]));

                var entityId = entityModel.get('id');
                var promise2 = _dataManager.fetchWithRelated('propertyCollection', ['entity'], {where: {s_entity_id: entityId}}, null, null, null);

                // get properties by entity id
                promise2
                .then(function(propertyCollection)
                {
                    var properties = !propertyCollection ? [] : propertyCollection.toJSON();
                    doValidatePropertyMap(entityName, properties, propertyMap);

                    return resolve(true);
                })
                .catch(errorCallback);
            })
            .catch(errorCallback);

            function errorCallback(error)
            {
                return reject(error);
            }
        })
    }

    function doValidatePropertyMap(entityName, databaseProperties, requestPropertyMap)
    {
        var databasePropertyMap = {};

        for(var i = 0, ii = databaseProperties.length; i < ii; i++)
        {
            var property = databaseProperties[i];
            var name = property.name;
            databasePropertyMap[name] = true;
        }

        for(var propertyName in requestPropertyMap)
            if(!(propertyName in _systemPropertyMap) && !(propertyName in databasePropertyMap))
                throw new Error(_errorMessageManager.formatError(_entityErrorMap.illegalProperty, [propertyName, entityName]));
    }

    return {
        upgradeVersion: upgradeVersion,
        validateAuthorization: validateAuthorization,
        validatePropertyMap: validatePropertyMap
    };
}

module.exports = entityManager();