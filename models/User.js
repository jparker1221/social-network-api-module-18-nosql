// Imports required dependencies from the Mongoose library
const { Schema, model, Types } = require('mongoose');

// Defines the User schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate: INSERT VALIDATOR HERE,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false, 
    }
);

// Virtual that returns the number of friends in the friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Creates the User model from the userSchema
const User = model('User', userSchema)

// Exports the User model
module.exports = User;