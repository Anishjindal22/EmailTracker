const mongoose = require('mongoose');
const TrackedEmail  = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    receiverEmail: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true
    },
    emailSubject: {
        type: String,
        trim: true,
        maxlength: 255
    },
    trackingToken:{
        type: String,
        required: true,
        unique: true,
        required: true,   
    },
        firstOpenedAt: {
            type: Date,
            default: null
        },

        lastOpenedAt: {
            type: Date,
            default: null
        },

        openCount: {
            type: Number,
            default: 0,
            min: 0
        }
},{
    timestamps: true
});

module.exports = mongoose.model('TrackedEmail', TrackedEmail);