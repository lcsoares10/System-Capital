const ContractPayCompetenceModel = require('@/src/models/ContractPayCompetence');

module.exports = {

    async index(req, res) {
        const contractPayCompetence = await ContractPayCompetenceModel.findAll({
            include: [
                { association: 'contract', required: true }
            ]
        });
        return res.json(contractPayCompetence);
    },

    async get(req, res) {
        const { id } = req.params;
        const contractPayMonth = await ContractPayCompetenceModel.findByPk(id,  {
            include: [
                { association: 'contract', required: true }
            ]
        });

        if (!contractPayMonth) {
            return res.status(400).json({ error: 'Contrato não existe'} );
        }

         return res.json(contractPayMonth);
    },

};
