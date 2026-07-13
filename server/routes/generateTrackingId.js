const express = require('express');
const router = express.Router();
const { generateTrackingId } = require('../controllers/generateTrackingId');

router.post('/generate', generateTrackingId);
module.exports = router;