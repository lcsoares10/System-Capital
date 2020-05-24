const ConsultantModel = require('@/src/models/Consultant');

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

  async indexInvestors(req, res) {
      const consultants = await ConsultantModel.findAll({
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
      const consultant = await ConsultantModel.findByPk(id);

      if (!consultant) {
          return res.status(400).json({ error: 'Consultor não existe'} );
      }

        const consultants = await ConsultantModel.findByPk(id, {
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
