const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info(`${request.method}: ${request.path} `, request.body);
    next();
};

const uknownEndpoint = (request, response) => {
    response.status(404).json({error: 'uknown endpoint'}); 
};

const errorHanler = (error, request, response, next) => {
    logger.error(error.message);

    if(error.name === 'CastError'){
        return response.status(400).json({error: 'Malformatted id'});
    }else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message});
    }else if(error.name === 'JsonWebTokenError'){
        return response.status(400).json({error: error.message});
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    try {
        const authorization = request.get('authorization');

        if(authorization && authorization.startsWith('Bearer ')){
            request.token = authorization.replace('Bearer ', '');
        }

        next();
    } catch (exception){
        response.status(400).json({error: 'invalid token'});
    }
    const authorization = request.get('authorization');
};

module.exports = {
    requestLogger,
    uknownEndpoint,
    errorHanler, 
    tokenExtractor
};