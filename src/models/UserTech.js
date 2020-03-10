const { Model, DataTypes } = require('sequelize');


class UserTech extends Model {

    static init(connection) {
        super.init({
            user_id: {
                type: DataTypes.INTEGER
            }
        });
    }
}

module.exports = UserTech;
