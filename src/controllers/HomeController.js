
module.exports = {
    async index(req, res) {
        return req.json({message: 'Hello world!'});
    }
};
