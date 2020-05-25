const express = require ('express');

const adminControllers = require ('../controllers/admin');
const isAuth = require ('../middleware/isAuth');

const router = express.Router();

// Admin get all ballots
router.get('/ballots', isAuth, adminControllers.getBallots);

// Admin get a single ballot
router.get('/ballot/:ballotTitle', isAuth, adminControllers.getBallot);

// Admin create new ballot
router.post('/ballot', isAuth, adminControllers.createBallot);

//Admin update ballot
router.patch('/ballot/:ballotTitle', isAuth, adminControllers.updateBallot);

//Admin delete ballot
router.delete('/ballot/:ballotTitle', isAuth, adminControllers.deleteBallot);


module.exports = router;