function dataManager() 
{
    var _dateFormat = require('dateformat');
    var _uuid = require('uuid');

    var _dbManager = requireLocal('helpers/dbManager');
    var _modelMap = requireLocal('models/index');

    function fetch(modelName, filterMap, transactionScope)
    {
        var promise = new _modelMap[modelName](filterMap);

        return transactionScope ?
            promise.fetch({transacting: transactionScope}) : 
            promise.fetch();
    }

    function fetchAll(modelName, sortDescriptions, pageSize, page, transactionScope)
    {
        var promise = new _modelMap[modelName]()
            .query(orderingHandler)
            .query(paginationHandler);

        return transactionScope ?
            promise.fetchAll({transacting: transactionScope}) : 
            promise.fetchAll();
        
        function orderingHandler(qb)
        {
            if(!sortDescriptions)
                return;
            
            for(var i = 0, ii = sortDescriptions.length; i < ii; i++)
                qb.orderBy(sortDescriptions[i].field, sortDescriptions[i].direction);
        }

        function paginationHandler(qb)
        {
            if(!pageSize)
                return;

            if(pageSize)
                qb.limit(pageSize);

            if(page)
                qb.offset(page < 2 ? 0 : pageSize * page - pageSize );
        }
    }

    function fetchWithoutRelated(modelName, filterMap, sortDescriptions, pageSize, page, transactionScope)
    {
        var promise = new _modelMap[modelName]()
            .query(filterMap)
            .query(orderingHandler)
            .query(paginationHandler);

        return transactionScope ? 
            promise.fetch({transacting: transactionScope}) : 
            promise.fetch();

        function orderingHandler(qb)
        {
            if(!sortDescriptions)
                return;
            
            for(var i = 0, ii = sortDescriptions.length; i < ii; i++)
                qb.orderBy(sortDescriptions[i].field, sortDescriptions[i].direction);
        }

        function paginationHandler(qb)
        {
            if(!pageSize)
                return;

            if(pageSize)
                qb.limit(pageSize);

            if(page)
                qb.offset(page < 2 ? 0 : pageSize * page - pageSize );
        }
    }

    function fetchWithRelated(modelName, relatedTableNames, filterMap, sortDescriptions, pageSize, page, transactionScope)
    {
        var promise = new _modelMap[modelName]()
            .query(filterMap)
            .query(orderingHandler)
            .query(paginationHandler);

        return transactionScope ? 
            promise.fetch({withRelated: relatedTableNames, transacting: transactionScope}) : 
            promise.fetch({withRelated: relatedTableNames});

        function orderingHandler(qb)
        {
            if(!sortDescriptions)
                return;
            
            for(var i = 0, ii = sortDescriptions.length; i < ii; i++)
                qb.orderBy(sortDescriptions[i].field, sortDescriptions[i].direction);
        }

        function paginationHandler(qb)
        {
            if(!pageSize)
                return;

            if(pageSize)
                qb.limit(pageSize);

            if(page)
                qb.offset(page < 2 ? 0 : pageSize * page - pageSize );
        }
    }

    function save(modelName, forger, transactionScope)
    {
        var promise = new _modelMap[modelName](forger);

        return transactionScope ? 
            promise.save(null, {transacting: transactionScope}) :
            promise.save();
    }

    function processTransaction(transaction)
    {
        return _dbManager.transaction(transaction);
    }

    function generateUuid()
    {
        return _uuid.v1();
    }

    function getDateTimeNow()
    {
        return _dateFormat(new Date(), 'yyyy-mm-dd H:MM:ss');
    }

    return {
        fetch: fetch,
        fetchAll: fetchAll,
        fetchWithoutRelated: fetchWithoutRelated,
        fetchWithRelated: fetchWithRelated,
        processTransaction: processTransaction,
        save: save,
        generateUuid: generateUuid,
        getDateTimeNow: getDateTimeNow
    };
}

module.exports = dataManager();