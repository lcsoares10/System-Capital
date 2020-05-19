const Administrator = require('@/src/models/Administrator');

module.exports = {

    async index(req, res) {
        const administrators = await Administrator.findAll({
            include: { association: 'user', required: true } //required: true -> Faz junção com INNER JOIN
        });
        return res.json(administrators);
    },

};