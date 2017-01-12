var dbManager = require('../helpers/dbManager');
var model = require('./managerTestModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;