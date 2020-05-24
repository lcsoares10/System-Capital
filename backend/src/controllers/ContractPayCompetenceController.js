const ContractPayCompetenceModel = require('@/src/models/ContractPayCompetence');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    const page = req.query.page || 1;
    const options = {
      include: [
        { association: 'contract', required: true }
      ]
    };

    const Pagination = new PaginationClass(ContractPayCompetenceModel);
    const result = await Pagination.select(page, options);

    return res.json(result);
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
