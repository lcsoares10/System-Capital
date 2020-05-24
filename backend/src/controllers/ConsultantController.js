const ConsultantModel = require('@/src/models/Consultant');
const InvestorModel = require('@/src/models/Investor');

module.exports = {

  async index(req, res) {
      const consultants = await ConsultantModel.findAll({
          include: { association: 'user', required: true }
      });
      return res.json(consultants);
  },

  async get(req, res) {
      const { id } = req.params;
      const consultant = await ConsultantModel.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!consultant) {
          return res.status(400).json({ error: 'Consultor não existe'} );
      }

        return res.json(consultant);
  },

  /** Investors */

  async getInvestors(req, res) {
      const { id } = req.params;
      const consultant = await ConsultantModel.findByPk(id);

      if (!consultant) {
          return res.status(400).json({ error: 'Consultor não existe'} );
      }

      const resilt = await InvestorModel.findAll({
        include: { association: 'user', required: true },
        where: {
          id_consultant: id
        }
      });

      return res.json(resilt);
  },

};
