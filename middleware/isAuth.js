const jwt = require ('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // const authHeader = req.get('Authorization');
        // if (!authHeader) {
        //     const error = new Error ('Not authenticated!')
        //     error.statusCode = 401;
        //     throw error
        // }

        // retrieve and verify JSON web token
        // const token = authHeader.split(' ')[1];
        const token = req.body.token;
        const decodedToken = jwt.verify(token, 'somesupersupersupersecret');
            if (!decodedToken) {
                const error = new Error ('Not authenticated!');
                error.statusCode = 401;
                throw error;
            };
        
        // add the userId to the request body
        req.password = decodedToken.password;
        req.designation = decodedToken.designation;

        // check if user is admin or not
        req.clearanceLevel = decodedToken.clearanceLevel;
            if (req.clearanceLevel === 'Admin') {
                req.isAdmin = true;
            } else if (req.clearanceLevel === 'User') {
                req.isUser = true
            }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next (err);
    }
    next();
}