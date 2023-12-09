var express = require('express');
var router = express.Router();
var PurchaseController = require('../controllers/PurchaseController.js');

/*
 * GET
 */
router.get('/', PurchaseController.list);
router.get('/:id', PurchaseController.show);
router.get('/user/:id', PurchaseController.byUser);

/*
 * POST
 */
router.post('/', PurchaseController.create);

/*
 * PUT
 */
router.put('/:id', PurchaseController.update);

/*
 * DELETE
 */
router.delete('/:id', PurchaseController.remove);

module.exports = router;
