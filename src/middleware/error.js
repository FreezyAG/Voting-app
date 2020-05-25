const errorHandler = (error, req, res, next) => {
    console.log('[from error middleware]');
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data || null;
    res.status(status).json({message: message, data: data})
}

module.exports = errorHandler;