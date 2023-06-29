const { User } = require('../models');

const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find().populate("thoughts").populate("friends")
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    // Get a single user by id
    getUserById(req, res) {
        User.findById(req.params.id).populate("thoughts").populate("friends")
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    // Update user by id
    updateUser(req, res) {
        User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json({ message: 'User successfully deleted' });
            })
            .catch(err => res.status(500).json(err));
    },
    // Add a new friend to a user's friend list
    addFriend(req, res) {
        User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);

            })
            .catch(err => res.status(500).json(err));
    },
    // Remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },
};

module.exports = userController;