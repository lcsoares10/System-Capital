const ContractModel = require('@/src/models/Contract');

module.exports = {

    async index(req, res) {
        const contracts = await ContractModel.findAll({
            include: [
                {
                    association: 'investor',
                    required: true,
                    include : {association: 'user'}
                }
            ]
        });
        return res.json(contracts);
    },

    async get(req, res) {
        const { id } = req.params;
        const contract = await ContractModel.findByPk(id,  {
            include: [
                {
                    association: 'investor',
                    required: true,
                    include : {association: 'user'}
                }
            ]
        });

        if (!contract) {
            return res.status(400).json({ error: 'Contrato não existe'} );
        }

         return res.json(contract);
    },

    async indexPayMonth(req, res) {
        const contracts = await ContractModel.findAll({
            include: [
                {
                    association: 'investor',
                    required: true,
                    include : {association: 'user'}
                },
                { association: 'contractPayCompetences' }
            ]
        });
        return res.json(contracts);
    },

    async getPayMonth(req, res) {
        const { id } = req.params;
        const contract = await ContractModel.findByPk(id,  {
            include: [
                {
                    association: 'investor',
                    required: true,
                    include : {association: 'user'}
                },
                { association: 'contractPayCompetences' }
            ]
        });

        if (!contract) {
            return res.status(400).json({ error: 'Contrato não existe'} );
        }

         return res.json(contract);
    },

};
