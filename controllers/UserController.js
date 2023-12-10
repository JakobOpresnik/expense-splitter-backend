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

    currentUser: function(req, res) {
        UserModel.find()
            .then(users => {
                const currentUser = users.find(user => user.token === true)
                if (!currentUser) {
                    return res.status(404).json({
                        message: 'no user currently logged in'
                    });
                }
                //console.log(currentUser);
                return res.status(200).json(currentUser);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error getting currently logged-in user',
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
                    message: 'error when creating User',
                    error: err
                });
            });
    },

    login: function (req, res) {
/*         const { email, password } = req.body;


        const users = await UserModel.find();
        const match = users.find(user => user.email === email && user.password === password)

        if (match) {
            match.token = true;
            match.save()
                .then(loggedUser => {
                    return res.status(201).json(loggedUser);
                })
                .catch(err => {
                    return res.status(500).json({
                        message: 'error when logging user in',
                        error: err
                    });
                });
                        
            return res.status(201).json(match)
        }
        else {
            return res.status(404).json({
                message: 'user login failed'
            });
        } */

        // destructure request body
        const { email, password } = req.body;

        UserModel.find()
            .then(users => {
                const matchingUser = users.find(user => user.email === email && user.password === password)
                matchingUser.token = true;

                matchingUser.save()
                    .then(loggedUser => {
                        return res.status(201).json(loggedUser);
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'error when logging user in',
                            error: err
                        });
                    });                        
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error getting users',
                    error: err
                });
            });
    },

    logout: function(req, res) {
        UserModel.find()
            .then(users => {
                const matchingUser = users.find(user => user.token === true)
                matchingUser.token = false

                matchingUser.save()
                    .then(logoutUser => {
                        return res.status(500).json(logoutUser);
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: 'error when logging user out',
                            error: err
                        });
                    });
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'error getting users',
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
                user.balance = req.body.balance ? req.body.balance : user.balance;
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
