var UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function(req, res) {
        UserModel.find()
            .then(users => {
                return res.json(users);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when getting users',
                    error: err
                });
            });
    },

    /* list: async function (req, res) {
        try {
            const users = await UserModel.find()
            return res.json(users)
        }
        catch (err) {
            return res.status(500).json({
                message: 'Error when getting User.',
                error: err
            })
        }
    }, */

    /**
     * UserController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'no such user'
                    });
                }

                return res.json(user);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when getting user.',
                    error: err
                });
            });
    },

    /**
     * UserController.create()
     */
    create: function (req, res) {

        const user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            token: req.body.token
        });
    
        user.save()
            .then(newUser => {
                return res.status(201).json(newUser);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when creating User',
                    error: err
                });
            });
    },

    login: function (req, res) {
        var id = req.params.id;

        UserModel.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'user not found'
                    });
                }

                // user is logged in if his token is set to true
                user.token = true;

                user.save()
                    .then(loggedUser => {
                        return res.status(201).json(loggedUser);
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'error when loggin user in',
                            error: err
                        });
                    });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error getting user',
                    error: err
                });
            });
    },
    
/*     create: function (req, res) {
        var User = new UserModel({
			username : req.body.username,
			password : req.body.password,
			email : req.body.email,
			token : req.body.token
        });

        User.save(function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating User',
                    error: err
                });
            }

            return res.status(201).json(User);
        });
    },
 */
    /**
     * UserController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'user not found'
                    });
                }

                user.username = req.body.username ? req.body.username : user.username;
                user.password = req.body.password ? req.body.password : user.password;
                user.email = req.body.email ? req.body.email : user.email;
                user.token = req.body.token ? req.body.token : user.token;

                user.save()
                    .then(updatedUser => {
                        return res.status(201).json(updatedUser);
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'error when updating user',
                            error: err
                        });
                    });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error getting user',
                    error: err
                });
            });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndDelete(id)
            .then(deletedUser => {
                return res.status(204).json(deletedUser);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error when deleting user',
                    error: err
                });
            });
    }
};
