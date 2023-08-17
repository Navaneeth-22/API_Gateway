const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { StatusCodes } = require("http-status-codes")
const {AppError} = require("../errors/app-error")
const {ServerConfig} = require("../../config")

async function comparePassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function generateToken(data){
    try {
        return await jwt.sign(data,ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRES_IN});
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function verifyToken(token){
    try {
        return await jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    comparePassword,
    generateToken,
    verifyToken
}