const Ballot = require ('../models/ballot');
const User = require ('../models/user');
const { errorStatusCodeHandler, adminIsAuthorized } = require ('../util/util');

// create a ballot
exports.createBallot = async (req, res, next) => {
    try {
        // check authorization
        adminIsAuthorized(req);
        
        // retrieve request body
        const title = req.body.title;

        // check if voteSubject exists
        const ballotExists = await Ballot.findOne({ where: { title: title }});
            if (ballotExists) {
                const error = new Error('Ballot exists!');
                error.statusCode = 401;
                throw error;
            }

        // create new ballot
        const ballot = await Ballot.create({
            title: title
        })

        // send JSON response
        res.json({
            error: false,
            code: 200,
            message: 'Ballot created successfully!'
        });

    } catch (err) {
        errorStatusCodeHandler(err);
        next(err);
    }
};

// get all ballots
exports.getBallots = async (req, res, next) => {
    try {
        // check authorization
        adminIsAuthorized(req);

        // pagination details
        const page = req.query.page || 1;
        const perPageLimit = 1;

        // get ballots
        const ballot = await Ballot.findAll({
            order: [
                ["id", "DESC"]
            ],
            offset: ((page - 1) * perPageLimit),
            limit: perPageLimit,
            subQuery: false
        })

        // send JSON response
        res.status(200).json({
            ballot: ballot
        })
    } catch (err) {
        errorStatusCodeHandler(err);
        next (err);
    }
};

// get a single ballot
exports.getBallot = async (req, res, next) => {
    try {
        // check authorization
        adminIsAuthorized(req);

        // find ballot
        const title = req.params.ballotTitle;
        const ballot = await Ballot.findOne({ where: { title: title }})
            if (!ballot) {
                const error = new Error ('Ballot does not exist!');
                error.statusCode = 404;
                throw error
            }

        // send JSOn response
        res.status(200).json({ ballot: ballot })

    } catch (err) {
        errorStatusCodeHandler(err);
        next (err);
    }
};

// update a ballot
exports.updateBallot = async (req, res, next) => {
    try {
        // check authorization
        adminIsAuthorized(req);

        // find ballot
        const title = req.params.ballotTitle;
        const updatedTitle = req.body.title;
        const ballot = await Ballot.findOne({ where: { title: title }})
            if (!ballot) {
                const error = new Error ('Ballot does not exist!');
                error.statusCode = 404;
                throw error
            };
        
        // update the ballot
        ballot.update({
            title: updatedTitle
        });

        // send JSON response
        res.status(201).json({ 
            message: 'Ballot updated successful.',
            ballot: ballot
        });

    } catch (err) {
        errorStatusCodeHandler(err);
        next (err);
    };
};

// delete a ballot
exports.deleteBallot = async (req, res, next) => {
    try {
        // check authorization
        adminIsAuthorized(req);

        // find ballot
        const title = req.params.ballotTitle;
        const ballot = await Ballot.findOne({ where: { title: title }})
            if (!ballot) {
                const error = new Error ('Ballot does not exist!');
                error.statusCode = 404;
                throw error
            };

        // delete ballot
        ballot.destroy();

        // send JSON response
        res.status(200).json({ message: 'Ballot deleted successfully!'})

    } catch (err) {
        errorStatusCodeHandler(err);
        next (err);
    };
};
