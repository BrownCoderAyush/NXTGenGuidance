const express = require('express');
const { getSessions } = require('../controllers/session.controller');


const router = express.Router();

router.get('/getSessions', getSessions);
module.exports = router;