const AdministratorModel = require('@/src/models/Administrator');

module.exports = {

  async index(req, res) {
      const administrators = await AdministratorModel.findAll({
          include: { association: 'user', required: true } //required: true -> Faz junção com INNER JOIN
      });
      return res.json(administrators);
  },

  async get(req, res) {
      const { id } = req.params;
      const administrator = await AdministratorModel.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!administrator) {
          return res.status(400).json({ error: 'AdministratorModel não existe'} );
      }

        return res.json(administrator);
  },

};
