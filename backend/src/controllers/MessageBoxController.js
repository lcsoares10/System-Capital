const MessageBoxModel = require('@/src/models/MessageBox');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    const page = req.query.page || 1;
    const options = {};

    const Pagination = new PaginationClass(MessageBoxModel);
    const result = await Pagination.select(page, options);

    return res.json(result);
  },

  async get(req, res) {
    const { id } = req.params;

    const result = await MessageBoxModel.findByPk(id,  {
        include: {
          association: 'administrator',
          include: {
            association: 'user'
          }
        },
        where : {
          id
        }
    });

    if (!result) {
        return res.status(400).json({ error: 'Mensagem não existe'} );
    }

    return res.json(result);
  },

};
