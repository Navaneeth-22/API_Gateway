const {StatusCodes} = require('http-status-codes');
const {AppError} = require('../utils');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        try {
            return await this.model.findAll();
        } catch (error) {
            throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getById(id) {
        try {
            return await this.model.findByPk(id);
        } catch (error) {
            throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateById(id, data) {
        try {
            return await this.model.update(data, {
                where: {
                    id
                }
            });
        } catch (error) {
            throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteById(id) {
        try {
            return await this.model.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}


module.exports = CrudRepository;