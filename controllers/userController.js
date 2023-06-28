const { User } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find()
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    }
    // Get a single user by id

    // Create a new user

    // Update user by id

    // Delete a user

    // Add a new friend to a user's friend list

    // Remove a friend from a user's friend list
};

module.exports = userController;