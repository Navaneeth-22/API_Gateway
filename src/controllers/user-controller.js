const {UserService} = require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

async function createUser(req, res, next) {
    try {
        const user = await UserService.signup({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name
        });
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function login(req, res, next) {
    try {
        const {user, jwt} = await UserService.login({
            email : req.body.email,
            password : req.body.password
        });
        SuccessResponse.data = {user, jwt};
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function addRole(req, res, next) {
    try {
        const user = await UserService.addRole({
            id : req.id,
            user_id : +req.body.user_id,
            role : req.body.role
        });
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createUser,
    login,
    addRole
}