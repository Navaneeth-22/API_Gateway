const CrudRepository = require('./crud-repository');
const {User} = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getByEmail(email) {
        try {
            return await User.findOne({
                where: {
                    email
                }
            });
        } catch (error) {
            throw new AppError(error.message,StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }



}

module.exports = UserRepository;