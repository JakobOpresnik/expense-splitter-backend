var GroupModel = require('../models/GroupModel.js');

/**
 * GroupController.js
 *
 * @description :: Server-side logic for managing Groups.
 */
module.exports = {

    /**
     * GroupController.list()
     */
    list: function (req, res) {
        GroupModel.find()
            .then(groups => {
                return res.json(groups);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when getting Group.',
                    error: err
                });
            });
    },

    /**
     * GroupController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        GroupModel.findById(id)
            .then(group => {
                if (!group) {
                    return res.status(404).json({
                        message: 'no such group'
                    });
                }

                return res.json(group);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when getting group',
                    error: err
                });
            });
    },

    hasUser: function (req, res) {
        var groupId = req.params.id;
        var userId = req.params.userId;

        GroupModel.findById(groupId)
        .then(group => {
            if (!group) {
                return res.status(404).json({
                    message: 'group not found'
                });
            }
            for (let user of group.users) {
                if (user.toString() === userId) {
                    return res.status(200).json({
                        message: true,
                    });
                }
            }
            return res.status(200).json({
                message: false,
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'error getting group',
                error: err
            });
        });
    },

    /**
     * GroupController.create()
     */
    create: function (req, res) {

        const group = new GroupModel({
			name : req.body.name,
            people : req.body.people,
			users : req.body.users,
            purchases : req.body.purchases,
			transactions : req.body.transactions
        });

        group.save()
            .then(newGroup => {
                return res.status(201).json(newGroup);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when creating group',
                    error: err
                });
            });
    },

    addUser: function (req, res) {

    },

    removeUser: function (req, res) {
        var id = req.params.id;
        var userId = req.params.userId;

        GroupModel.findById(id)
        .then(group => {
            if (!group) {
                return res.status(404).json({
                    message: 'group not found'
                });
            }
            group.name = req.body.name ? req.body.name : group.name;
            group.people = req.body.people ?? group.people;
            group.users = group.users.filter(user => user.toString() !== userId);
            group.purchases = req.body.purchases ?? group.purchases;
            group.transactions = req.body.transactions ? req.body.transactions : group.transactions;

            group.save()
                .then(updatedGroup => {
                    return res.status(201).json(updatedGroup);
                })
                .catch(err => {
                    return res.status(500).json({
                        message: 'error when updating group',
                        error: err
                    });
                });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'error getting group',
                error: err
            });
        });
    },

    /**
     * GroupController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        GroupModel.findById(id)
            .then(group => {
                if (!group) {
                    return res.status(404).json({
                        message: 'group not found'
                    });
                }

                group.name = req.body.name ? req.body.name : group.name;
                group.people = req.body.people ?? group.people;
                if (req.body.users && !group.users.includes(req.body.users)) {
                    group.users.push(req.body.users)
                }
                //group.users = req.body.users ? req.body.users : group.users;
                if (req.body.purchases) {
                    group.purchases.push(req.body.purchases)
                }
                //group.purchases = req.body.purchases ?? group.purchases;
                group.transactions = req.body.transactions ? req.body.transactions : group.transactions;

                group.save()
                    .then(updatedGroup => {
                        return res.status(201).json(updatedGroup);
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'error when updating group',
                            error: err
                        });
                    });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error getting group',
                    error: err
                });
            });
    },

    /**
     * GroupController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        GroupModel.findByIdAndDelete(id)
            .then(deletedGroup => {
                return res.status(204).json(deletedGroup);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when deleting group',
                    error: err
                });
            });
    }
};
