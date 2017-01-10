var dbManager = require('../helpers/dbManager');
var model = require('./phTransactionModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;