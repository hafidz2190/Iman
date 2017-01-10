var dbManager = require('../helpers/dbManager');
var model = require('./workflowStatusModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;