var dbManager = require('../helpers/dbManager');
var model = require('./historyModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;