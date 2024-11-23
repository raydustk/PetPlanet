const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        message: err.message || 'Ocurrió un error en el servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    };

    console.error(`[Error] ${err.message}`);
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
