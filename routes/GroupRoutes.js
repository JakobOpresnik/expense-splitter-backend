var express = require('express');
var router = express.Router();
var GroupController = require('../controllers/GroupController.js');

/*
 * GET
 */
router.get('/', GroupController.list);

/*
 * GET
 */
router.get('/:id', GroupController.show);

/*
 * POST
 */
router.post('/', GroupController.create);

/*
 * PUT
 */
router.put('/add', GroupController.addUser);
router.put('/:id', GroupController.update);

/*
 * DELETE
 */
router.delete('/:id', GroupController.remove);

module.exports = router;
