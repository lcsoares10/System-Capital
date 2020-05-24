const UserModel = require('@/src/models/User');
const MessageBoxModel = require('@/src/models/MessageBox');

module.exports = {

    async index(req, res) {
        const users = await UserModel.findAll();
        return res.json(users);
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
