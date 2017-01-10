var dbManager = require('../helpers/dbManager');
var model = require('./propertyModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;