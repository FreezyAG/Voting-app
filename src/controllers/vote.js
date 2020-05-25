const Ballot = require ('../models/ballot');
const { errorStatusCodeHandler, userIsAuthorized } = require ('../util/util');

// user checks the voting statistics
exports.getVotes = async (req, res, next) => {
    try {
        // check authorization
        userIsAuthorized(req);

        // retrieve request body
        const title = req.body.title

        //find ballot if it exists
        const ballot = await Ballot.findOne({ where: { title: title } });
            if (!ballot) {
                const error = new Error ('Ballot does not exist');
                error.statusCode = 404;
                throw error;
            };

        // return JSON response
        res.json({
            error: false,
            code: 200,
            votes: {
                yes: ballot.dataValues.inSupport,
                no: ballot.dataValues.against,
                totalVotes: ballot.dataValues.totalVotes
            }
        });
    } catch (err) {
        errorStatusCodeHandler(err);
        next (err);
    }
}

//  user casts a vote
exports.vote = async (req, res, next) => {
    // develop the logic for one user one vote

    try {
        // check authorization
        userIsAuthorized(req);

        // retrieve request body
        const title = req.body.title
        const inSupport = req.body.for

        // find ballot
        const ballot = await Ballot.findOne({where: { title: title }})
            if (!ballot) {
                const error = new Error ('Ballot does not exist');
                error.statusCode = 404;
                throw error;
            };

        // copy ballot data
        const updatedBallotData = { ...ballot.dataValues }

        // add the corresponding vote
        inSupport ?
            updatedBallotData.inSupport++ :
            updatedBallotData.against++

        // calculate the total votes
        updatedBallotData.totalVotes = updatedBallotData.inSupport + updatedBallotData.against;

        // update the ballot
        await ballot.update({
            inSupport: updatedBallotData.inSupport,
            against: updatedBallotData.against,
            totalVotes: updatedBallotData.totalVotes
        })

        console.log('vote successful')
        console.log('updatedVote', updatedBallotData)

        // return JSON response
        res.json({
            error: false,
            code: 200,
            message: 'vote successful',
        })
    } catch (err) {
        errorStatusCodeHandler(err);
        next(err);
    };
};
