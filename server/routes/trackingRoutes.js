const express = require('express');
const router = express.Router();
const { trackEmailOpen } = require('../controllers/EmailTracking');

router.get('/track/:id', trackEmailOpen);

module.exports = router;