const { Thought, User } = require('../models');
const { Types } = require('mongoose');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(500).json(err));
    },
    // Get a single thought by its id
    getThoughtById(req, res) {
        Thought.findById(req.params.thoughtId)
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(500).json(err));
    },
    // Create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(thoughtData => {
                return User.findByIdAndUpdate(req.body.userId, {
                    $addToSet: { thoughts: thoughtData._id }
                }, {
                    new: true
                })
            })
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    // Update a thought by its id
    updateThoughtById(req, res) {
        Thought.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(500).json(err));
    },
    // Remove a thought by its id
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.id)
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Thought not found' });
                }
                return User.findByIdAndUpdate(req.body.userId, {
                    $pull: { thoughts: req.params.id }
                }, {
                    new: true
                })
            })
            .then(thoughtData => res.json({ message: 'Thought successfully deleted' }))
            .catch(err => res.status(500).json(err));
    },
    // Create a reaction stored in a single thought's reactions array field
    addReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.id, { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then(thoughtData => {
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found' })
            }
            res.json(thoughtData)
        }).catch(err => res.status(500).json(err));
    },
    // Pull and remove a reaction by its reactionId value
    removeReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.id, { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        ).then(thoughtData => {
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found' })
            }
            res.json(thoughtData)
        }).catch(err => res.status(500).json(err));
    },
}

module.exports = thoughtController;