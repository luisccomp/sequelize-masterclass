const Tech = require('../models/Tech');
const User = require('../models/User');


module.exports = {

    /**
     * Adiciona uma nova tecnologia ao banco de dados e a associa a um usuário
     * existente.
     * @param {*} req 
     * @param {*} res 
     */
    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        // Checking if a given user exists on database
        const user = await User.findByPk(user_id);

        if (user === null) {
            res.status(400).json({error: 'User not found'});
        }

        // If user exists, then checks if tech exists or not in database. If
        // not exists, then add it.
        const [ tech ] = await Tech.findOrCreate({
            where: {
                name
            }
        });

        // Associate a tech with an user
        // WARNING: this is the "user" and not "User".
        await user.addTech(tech);

        return res.json(tech);
    },

    /**
     * Lista todas as tecnologias associadas a um usuário.
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: {
                association: 'techs',
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });

        return res.json(user.techs);
    },

    async remove(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        // Verificando se o usuario existe no banco de dados
        const user = await User.findByPk(user_id);

        if (!user) {
            res.status(400).json({error: 'User not found'});
        }

        // Buscando uma tecnologia no banco de dados
        const tech = await Tech.findOne({
            where: {
                name
            }
        });

        // Removendo a tecnologia associada ao usuário.
        await user.removeTech(tech);

        return res.json(tech);
    }
};
