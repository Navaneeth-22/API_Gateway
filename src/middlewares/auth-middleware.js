const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const {UserService} = require('../services');
const {ErrorResponse} = require('../utils/common');

async function Authenticated(req, res, next) {
    try {
        const token = req.headers.authorization;
        if(!token){
            ErrorResponse.message = 'Token is required';
            ErrorResponse.error = new AppError(ErrorResponse.message, StatusCodes.UNAUTHORIZED);    
            return res
                    .status(error.statusCode)
                    .json(ErrorResponse);
        }
        const id = await UserService.Authenticated(token);
        if(!id){
            ErrorResponse.message = 'Invalid token';
            ErrorResponse.error = new AppError(ErrorResponse.message, StatusCodes.UNAUTHORIZED);    
            return res
                    .status(error.statusCode)
                    .json(ErrorResponse);
        }
        req.id = id;
        next();
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function isAdmin(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log(token)
        if(!token){
            ErrorResponse.message = 'Token is required';
            ErrorResponse.error = new AppError(ErrorResponse.message, StatusCodes.UNAUTHORIZED);
            return res
                    .status(error.statusCode)
                    .json(ErrorResponse);
        }

        const isAdmin = await UserService.isAdmin(token);

        if (!isAdmin) {
            ErrorResponse.message = 'You are not authorized to access this route';
            ErrorResponse.error = new AppError(ErrorResponse.message, StatusCodes.UNAUTHORIZED);
            return res
                    .status(error.statusCode)
                    .json(ErrorResponse);
        }
        next();
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    Authenticated,
    isAdmin
}
