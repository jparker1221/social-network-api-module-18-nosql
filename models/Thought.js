// Imports required dependencies from the Mongoose library
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Defines the Thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Virtual to get the length of a thought's reaction array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Creates the Thought model from the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Exports the Thought model
module.exports = Thought;