const UserModel = require('@/src/models/User');
const MessageBoxModel = require('@/src/models/MessageBox');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    const page = req.query.page || 1;
    const options = {};

    const Pagination = new PaginationClass(UserModel);
    const result = await Pagination.select(page, options);

    return res.json(result);
  },

  async get(req, res) {

      const { id } = req.params;
      const user = await UserModel.findByPk(id,  {
          //include: { association: 'user', required: true }
      });

      if (!user) {
          return res.status(400).json({ error: 'Usuário não existe'} );
      }

        return res.json(user);
  },

  async getMessages(req, res) {

    const { id } = req.params;

    const result = await MessageBoxModel.findAll({
        include: {
          association: 'users',
          attributes: [],
          where: {
            id
          }
        },
    });

    if (!result) {
        return res.status(400).json({ error: 'Usuário não existe'} );
    }

      return res.json(result);
},

  /*     async create(request, response) {
      const {name, email, whatsapp, city, uf} = request.body;

      const id = generateUniqueId();

      await connection('ongs').insert({
          id,
          name,
          email,
          whatsapp,
          city,
          uf
      });

      return response.json({id});
  } */
};
