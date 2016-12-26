var dbManager = require('../helpers/dbManager');
var userSessionModel = require('./userSessionModel');

var model = dbManager.Collection.extend({
    model: userSessionModel
});

module.exports = model;