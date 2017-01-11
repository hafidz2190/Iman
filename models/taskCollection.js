var dbManager = require('../helpers/dbManager');
var model = require('./taskModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;