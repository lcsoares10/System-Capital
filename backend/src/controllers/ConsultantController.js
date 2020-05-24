const ConsultantModel = require('@/src/models/Consultant');
const InvestorModel = require('@/src/models/Investor');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    const page = req.query.page || 1;
    const options = {
      include: { association: 'user', required: true }
    };

    const Pagination = new PaginationClass(ConsultantModel);
    const result = await Pagination.select(page, options);

    return res.json(result);
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
