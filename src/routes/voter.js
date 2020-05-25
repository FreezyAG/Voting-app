const express = require ('express');
const { body } = require ('express-validator');

const voteControllers = require ('../controllers/vote');
const isAuth = require ('../middleware/isAuth');

const router = express.Router();

//GET vote statistics
router.get('/votes', isAuth,
    voteControllers.getVotes)

//POST vote
router.post('/vote', isAuth, voteControllers.vote)

module.exports = router;