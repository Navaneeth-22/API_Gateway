const {UserRepository, RoleRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const {Auth} = require('../utils/common');
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const {ENUMS} = require('../utils/common');
const {ADMIN,USER,CINEMA_COMPANY} = ENUMS.USER_ROLE;

async function signup(data) {
    try {
        const user = await userRepository.create(data);
        const role = await roleRepository.getByName('user');
        console.log(role)
        user.addRole(role);
        return user;
    } catch (error) {
        throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function login(data){
    try {
        const user = await userRepository.getByEmail(data.email);
        if(!user){
            throw new AppError('User not found',StatusCodes.NOT_FOUND);
        }
        const isMatch = await Auth.comparePassword(data.password,user.password)
        if(!isMatch){
            throw new AppError('Incorrect password',StatusCodes.BAD_REQUEST);
        }
        const jwt = await Auth.generateToken({id: user.id, email: user.email});
        return {user, jwt};
    } catch (error) {
        throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function Authenticated(token){
    try {
        const res = await Auth.verifyToken(token);
        const user = await userRepository.getById(res.id);
        return user.id;
    } catch (error) {
        throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdmin(token){
    try {
        const res = await Auth.verifyToken(token);
        console.log(res)
        const user = await userRepository.getById(res.id);
        console.log(user)
        const role = await roleRepository.getByName(ADMIN);
        return user.hasRole(role)
    } catch (error) {
        throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addRole(data){
    try {
        console.log(data.role)
        const role = await roleRepository.getByName(data.role);
        if(!role){
            throw new AppError('Role not found',StatusCodes.NOT_FOUND);
        }
        const user = await userRepository.getById(data.user_id);
        if(!user){
            throw new AppError('User not found',StatusCodes.NOT_FOUND);
        }
        user.addRole(role);
        return user;

    } catch (error) {
        throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    signup,
    login,
    Authenticated,
    isAdmin,
    addRole
}