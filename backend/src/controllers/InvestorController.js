const Investor = require('@/src/models/Investor');

module.exports = {

    async index(req, res) {
        const investors = await Investor.findAll({
            include: [
                { association: 'user', required: true },
                { 
                    association: 'consultant',
                    include : {association: 'user'} 
                }
            ]
        });
        return res.json(investors);
    },

    async get(req, res) {
        const { id } = req.params;
        const investor = await Investor.findByPk(id,  { 
            include: { association: 'user', required: true }
        });

        if (!investor) {
            return res.status(400).json({ error: 'Investidor não existe'} );
        }

         return res.json(investor);
    },
    
};