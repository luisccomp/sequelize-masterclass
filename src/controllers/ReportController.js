const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = {
    async show(req, res) {
        // Encontrar todos os usuários que terminam com "@provider.com" e
        // desses usuários, encontrar aqueles que vivem em "Howling St."
        // e as tecnologias que começam com react.
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@email.com'
                }
            },
            include: [
                {
                    association: 'addresses',
                    where: {
                        street: 'Sunset Av.'
                    }
                },
                {
                    association: 'techs',
                    where: {
                        name: {
                            [Op.iLike]: 'React%'
                        }
                    }
                }
            ]
        });

        return res.json(users);
    }
};
