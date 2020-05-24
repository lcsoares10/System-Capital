const InvestorModel = require('@/src/models/Investor');
const ContractModel = require('@/src/models/Contract');

module.exports = {

  async index(req, res) {
      const result = await InvestorModel.findAll({
          include: [
              { association: 'user', required: true },
              {
                  association: 'consultant',
                  include : {association: 'user'}
              }
          ]
      });
      return res.json(result);
  },

  async get(req, res) {
      const { id } = req.params;

      const result = await InvestorModel.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!result) {
          return res.status(400).json({ error: 'Investidor não existe'} );
      }

      return res.json(result);
  },

  /** Contracts */

  async indexContracts(req, res) {

    const { id } = req.params;

    const result = await ContractModel.findAll({
      where: {
        id_investor: id
      }
    });

    return res.json(result);
  },

};

//TESTE
/*   async get(req, res) {
    const InvestorClass = require('@/src/class/Investor');
    const Investor = new InvestorClass();

    try {
      const { id } = req.params;
      await Investor.load(id);

    } catch (er) {
        return res.status(400).json({ error: er.message });
    }

    return res.json(Investor._values);
  }, */
