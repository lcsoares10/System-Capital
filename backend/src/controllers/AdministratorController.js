const Administrator = require('@/src/models/Administrator');

module.exports = {

  async index(req, res) {
      const administrators = await Administrator.findAll({
          include: { association: 'user', required: true } //required: true -> Faz junção com INNER JOIN
      });
      return res.json(administrators);
  },

  async get(req, res) {
      const { id } = req.params;
      const administrator = await Administrator.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!administrator) {
          return res.status(400).json({ error: 'Administrator não existe'} );
      }

        return res.json(administrator);
  },

  /** Messages */

  async indexMessages(req, res) {

    const { id } = req.params;

    const result = await Administrator.findAll({
        include: [
            {
              association: 'user',
              required: true,
              include: { association: 'messages_box' },
            },
        ],
        where : {
          id
        }
    });
    return res.json(result);
  },

  async getMessage(req, res) {

    const { id, id_message_box } = req.params;

    const result = await Administrator.findAll({
        include: [
            {
              association: 'user',
              required: true,
              include: {
                association: 'messages_box',
                where: {
                  id: id_message_box
                }
               },
            },
        ],
        where : {
          id
        }
    });

    if (!result.length) {
      return res.status(400).json({ error: 'Mensagem não existe'} );
  }

    return res.json(result);
  },

};
