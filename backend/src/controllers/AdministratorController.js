const AdministratorModel = require('@/src/models/Administrator');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    const page = req.query.page || 1;
    const options = {
      include: { association: 'user', required: true } //required: true -> Faz junção com INNER JOIN
    };

    const Pagination = new PaginationClass(AdministratorModel);
    const result = await Pagination.select(page, options);

    return res.json(result);
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
