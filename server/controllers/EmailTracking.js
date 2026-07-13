const TrackedEmail = require('../models/TrackedEmail');
const OpenEvent = require('../models/OpenEvent');
const pixel = require('../utils/pixel');
const trackEmailOpen = async (req, res) => {
    try{

        const { id } = req.params;
        if(!id || id.trim() === '') {
        return res.status(400).send('Invalid tracking ID');
    }
    const email = await TrackedEmail.findOne({trackingToken: id});
    if(!email) {
        return res.status(404).send('Email not found');
    }
    if(email.firstOpenedAt === null) {
        email.firstOpenedAt = new Date();
    }   
    email.lastOpenedAt = new Date();
    email.openCount += 1;
    await email.save();

    await OpenEvent.create({
        trackedEmailId: email._id,
        openedAt: new Date(),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        isProxy: req.headers['x-forwarded-for'] ? true : false  
    });
    res.set({
    "Content-Type": "image/png",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
    console.log(Buffer.isBuffer(pixel));
    console.log(pixel);
    res.send(pixel);
}
catch (error) {
    console.error('Error tracking email open:', error);
    res.status(500).send('Internal Server Error');
}
}
module.exports = { trackEmailOpen };