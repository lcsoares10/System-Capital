const Consultant = require('@/src/models/Consultant');
const Investor = require('@/src/models/Investor');
//const User = require('@/src/models/User');

module.exports = {

    async index(req, res) {
        const consultants = await Consultant.findAll({
            include: { association: 'user', required: true }
        });
        return res.json(consultants);
    },

    async get(req, res) {
        const { id } = req.params;
        const consultant = await Consultant.findByPk(id,  { 
            include: { association: 'user', required: true }
        });

        if (!consultant) {
            return res.status(400).json({ error: 'Consultor não existe'} );
        }

         return res.json(consultant);
    },

    async indexInvestors(req, res) {
        const consultants = await Consultant.findAll({
            include: [
                { association: 'user', required: true },
                { 
                    association: 'investors', 
                    include : {association: 'user'} 
                },    
            ]
        });
        return res.json(consultants);
    },

    async getInvestors(req, res) {
        const { id } = req.params;
        const consultant = await Consultant.findByPk(id);

        if (!consultant) {
            return res.status(400).json({ error: 'Consultor não existe'} );
        }
        
         const consultants = await Consultant.findByPk(id, {
             include: [
                { association: 'user', required: true },
                { 
                    association: 'investors', 
                    include : {association: 'user'} 
                },    
            ]
         });

         return res.json(consultants);
    },

};