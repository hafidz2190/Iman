var dbManager = require('../helpers/dbManager');

var mapper = dbManager.Model.extend({
    tableName: 'users'
});

module.exports = mapper;