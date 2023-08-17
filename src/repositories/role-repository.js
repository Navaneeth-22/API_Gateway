const CrudRepository = require('./crud-repository');
const {Role} = require('../models');
const {AppError} = require("../utils/errors/app-error")
const {StatusCodes} = require("http-status-codes")

class RoleRepository extends CrudRepository {
    constructor() {
        super(Role);
    }


    async getByName(name) {
        try {
            return await Role.findOne({
                where: {
                    name
                }
            });
        } catch (error) {
            throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports = RoleRepository;