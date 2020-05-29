const UserModel = require('@/src/models/User');
const MessageBoxModel = require('@/src/models/MessageBox');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    try {

      const page = req.query.page || 1;
      const options = {};

      const Pagination = new PaginationClass(UserModel);
      const result = await Pagination.select(page, options);

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async get(req, res) {

    try {

      const { id } = req.params;
      const result = await UserModel.findByPk(id);

      if (!result) {
          return res.status(400).json({ error: 'Usuário não existe'} );
      }

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async getMessages(req, res) {

    try {
      const { id } = req.params;
      const result = await MessageBoxModel.findAll({
          include: {
            association: 'users',
            required: true,
            attributes: ['id', 'name'],
            through: {
              attributes: ['viewed', 'time_view'],
              where: {
                id_user: id
              }
            },
          },
      },);

      if (!result) {
          return res.status(400).json({ error: 'Usuário não existe'} );
      }

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

},

};
