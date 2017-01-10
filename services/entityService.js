var express = require('express');
var serviceManager = require('../helpers/serviceManager');

var router = express.Router();
var requestHandler = serviceManager.requestHandler;

router.post('/getDropdownCollectionByProperty', requestHandler); //{property_id: ''}
router.post('/getEntityCollection', requestHandler); //{}
router.post('/getPropertyCollectionByEntity', requestHandler); //{entity_id: ''}
router.post('/getWorkflowStatusCollectionByProperty', requestHandler); //{property_id: ''}

module.exports = router;