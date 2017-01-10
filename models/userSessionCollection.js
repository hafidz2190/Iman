var dbManager = require('../helpers/dbManager');
var model = require('./userSessionModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;