const MessageBoxModel = require('@/src/models/MessageBox');

module.exports = {

  async index(req, res) {
      const result = await MessageBoxModel.findAll({
        //include: { association: 'users' }
      });
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
