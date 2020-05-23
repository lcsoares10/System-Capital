const MessagesBox = require('@/src/models/MessagesBox');

module.exports = {

  async index(req, res) {
      const result = await MessagesBox.findAll({
        //include: { association: 'users' }
      });
      return res.json(result);
  },

  async get(req, res) {
    const { id } = req.params;

    const result = await MessagesBox.findByPk(id,  {
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
