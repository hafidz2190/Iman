var dbManager = require('../helpers/dbManager');
var model = require('./dropdownModel');

var collection = dbManager.Collection.extend({
    model: model
});

module.exports = collection;