var PurchaseModel = require('../models/PurchaseModel.js');

/**
 * PurchaseController.js
 *
 * @description :: Server-side logic for managing Purchases.
 */
module.exports = {

    /**
     * PurchaseController.list()
     */
    list: function (req, res) {
        PurchaseModel.find()
            .then(purchases => {
                return res.json(purchases);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when getting purchases',
                    error: err
                });
            });
    },

    /**
     * PurchaseController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PurchaseModel.findById(id)
            .then(purchase => {
                if (!purchase) {
                    return res.status(404).json({
                        message: 'no such purchase'
                    });
                }

                return res.json(purchase);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when getting purchase.',
                    error: err
                });
            });
    },

    byUser: function (req, res) {
        var userId = req.params.id;

        PurchaseModel.find()
            .then(purchases => {
                const userPurchases = purchases.filter(purchase => purchase.user.toString() === userId);
                return res.json(userPurchases);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when getting purchases',
                    error: err
                });
            });
    },

    /**
     * PurchaseController.create()
     */
    create: function (req, res) {
        var purchase = new PurchaseModel({
			name : req.body.name,
			cost : req.body.cost,
			user : req.body.user,
            group : req.body.group
        });


        purchase.save()
            .then(newPurchase => {
                return res.status(201).json(newPurchase);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when creating purchase',
                    error: err
                });
            });
    },

    /**
     * PurchaseController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PurchaseModel.findById(id)
            .then(purchase => {
                if (!purchase) {
                    return res.status(404).json({
                        message: 'purchase not found'
                    });
                }

                purchase.name = req.body.name ? req.body.name : purchase.name;
                purchase.cost = req.body.cost ? req.body.cost : purchase.cost;
                purchase.user = req.body.user ? req.body.user : purchase.user;
                purchase.group = req.body.group ? req.body.group : purchase.group;

                purchase.save()
                    .then(updatedPurchase => {
                        return res.status(201).json(updatedPurchase);
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'error when updating purchase',
                            error: err
                        });
                    });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error getting purchase',
                    error: err
                });
            });
    },

    /**
     * PurchaseController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PurchaseModel.findByIdAndDelete(id)
            .then(deletedPurchase => {
                return res.status(204).json(deletedPurchase);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when deleting purchase',
                    error: err
                });
            });
    }
};
