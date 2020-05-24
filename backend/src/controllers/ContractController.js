const ContractModel = require('@/src/models/Contract');
const ContractPayCompetenceModel = require('@/src/models/ContractPayCompetence');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    const page = req.query.page || 1;
    const options = {
      include: [
        {
          association: 'investor',
          required: true,
          include : {association: 'user'}
        }
      ]
    };

    const Pagination = new PaginationClass(ContractModel);
    const result = await Pagination.select(page, options);

    return res.json(result);
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

  async getPayMonth(req, res) {

    const { id } = req.params;

    const contract = await ContractPayCompetenceModel.findAll({
      where: {
        id_contract: id
      }
    });

    if (!contract) {
        return res.status(400).json({ error: 'Contrato não existe'} );
    }

      return res.json(contract);
  },

};
