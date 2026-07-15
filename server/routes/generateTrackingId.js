const express = require('express');
const router = express.Router();
const { generateTrackingId } = require('../controllers/GenerateTrackingId');

router.post('/generate', generateTrackingId);
module.exports = router;