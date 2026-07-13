const mongoose = require('mongoose');
const openEventSchema = new mongoose.Schema({
    trackedEmailId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrackedEmail',
        required: true,
        index:true
    },
    openedAt : {
        type: Date,
        default: Date.now,
        index: true,
        immutable:true
    },
    ipAddress: {
        type: String,
        required: true,
        trim: true,
        immutable:true
    },
    userAgent: {
        type: String,
        required: true,
        trim: true,
        immutable:true
    },
    country : {
        type: String,
        trim: true,
        immutable:true
    },
    city:{
        type: String,
        trim: true,
        immutable:true
    },
    browser:{
        type: String,
        trim: true,
        immutable:true
    },
    os:{
        type: String,
        trim: true,
        immutable:true
    },
    deviceType:{
        type: String,
        trim: true,
        immutable:true
    },
    isProxy : {
        type: Boolean,
        default: false,
        immutable:true
    }
},{
    timestamps: false
});

module.exports = mongoose.model('OpenEvent', openEventSchema);