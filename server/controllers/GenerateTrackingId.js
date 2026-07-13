const crypto = require('crypto');
const TrackedEmail = require('../models/TrackedEmail');
const OpenEvent = require('../models/OpenEvent');

const generateTrackingId = async (req,res) =>{
    console.log('Received request to generate tracking ID:', req.body);
    try{
        const {senderId,receiverEmail,emailSubject} = req.body;
        if(!senderId || !receiverEmail || !emailSubject){
            return res.status(400).send('Missing required fields');
        }
        const trackingId = crypto.randomBytes(32).toString('hex');
        await TrackedEmail.create({
            senderId,
            receiverEmail,
            subject: emailSubject,
            trackingToken: trackingId
        });
        res.status(201).json({success: true,
             trackingId });
    }
    catch (error) {
        console.error('Error generating tracking ID:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { generateTrackingId };