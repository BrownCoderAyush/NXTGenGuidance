const express = require("express");
const { getSessions, createSession, deleteSession } = require("../controllers/session.controller");

const router = express.Router();


router.get('/:id', getSession);
router.delete('/:id', deleteSession);
router.post('/', createSession);
router.get('/getSessions', getSessions);

module.exports = router;