const Address = require('../models/Address');
const User = require('../models/User');


module.exports = {
    /**
     * Cria um novo endereço e associa ele a um usuário cadastrado na aplicação.
     * @param {*} req 
     * @param {*} res 
     */
    async store(req, res) {
        const { user_id } = req.params;
        const { zipcode, street, number } = req.body;

        // Verificando se o dado usuário existe antes de criar um endereço
        // associado a ele.
        const user = await User.findByPk(user_id);

        if (user === null) {
            return res.status(400).json({error: 'User not found.'});
        }

        // Retornando as informações do novo endereço criado no banco de dados.
        return res.json(await Address.create({
            zipcode,
            street,
            number,
            user_id
        }));
    },

    /**
     * Lista todos os endereços associados à um usuário armazenado no banco de
     * dados da aplicação.
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const { user_id } = req.params;

        /*
        modificando a busca para diminuir a quantidade de consultas realizadas
        no banco de dados.

        // Verificando se o usuário existe na base de dados antes de listar os
        // endereços.
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status.json({error: 'User not found'});
        }

        return res.json(await Address.findAll({
            where: {
                user_id
            }
        }));
        */

        /**
         * Essa forma se assemelha a buscar os endereços associados aos users
         * da seguinte forma:
         * 
         * SELECT *
         * FROM users u
         * INNER JOIN addresses a
         * ON u.id = a.user_id
         * WHERE u.id = {user_id} AND
         *       a.user_id = u.id;
         * 
         * Dessa forma, menos consultas são realizadas no banco de dados.
         */
        const user = await User.findByPk(user_id, {
            include: {
                association: 'addresses'
            }
        });

        if (!user)
            return res.status(404).json({error: 'User not found'});
        
        return res.json(user);
    }
};
