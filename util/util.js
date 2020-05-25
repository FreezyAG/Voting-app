// error statusCode handler function
exports.errorStatusCodeHandler = err => {
    if (!err.statusCode) {
        err.statusCode = 500;
    };
    return err.statusCode;
};

// user authorization handler function
exports.userIsAuthorized = (req) => {
    if (!req.isUser && !req.isAdmin) {
        const error = new Error ('Not authorized to vote!');
        error.statusCode = 401;
        throw error
    };
};

// admin authorization handler function
exports.adminIsAuthorized = (req) => {
    if (!req.isAdmin) {
        const error = new Error ('Not authorized to create!');
        error.statusCode = 401;
        throw error
    };
};