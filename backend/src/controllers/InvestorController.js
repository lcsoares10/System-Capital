const Investor = require('@/src/models/Investor');

module.exports = {

  async index(req, res) {
      const result = await Investor.findAll({
          include: [
              { association: 'user', required: true },
              {
                  association: 'consultant',
                  include : {association: 'user'}
              }
          ]
      });
      return res.json(result);
  },

  async get(req, res) {
      const { id } = req.params;

      const result = await Investor.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!result) {
          return res.status(400).json({ error: 'Investidor não existe'} );
      }

        return res.json(result);
  },

  /** Messages */

  async indexMessages(req, res) {

    const { id } = req.params;

    const result = await Investor.findAll({
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

    const result = await Investor.findAll({
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
