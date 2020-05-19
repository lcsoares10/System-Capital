const Investor = require('@/src/models/Investor');

module.exports = {

    async index(req, res) {
        const investors = await Investor.findAll({
            include: { association: 'user', required: true }
        });
        return res.json(investors);
    },
    
};