const Consultant = require('@/src/models/Consultant');

module.exports = {

  async index(req, res) {
      const consultants = await Consultant.findAll({
          include: { association: 'user', required: true }
      });
      return res.json(consultants);
  },

  async get(req, res) {
      const { id } = req.params;
      const consultant = await Consultant.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!consultant) {
          return res.status(400).json({ error: 'Consultor não existe'} );
      }

        return res.json(consultant);
  },

  /** Investors */

  async indexInvestors(req, res) {
      const consultants = await Consultant.findAll({
          include: [
              { association: 'user', required: true },
              {
                  association: 'investors',
                  include : {association: 'user'}
              },
          ]
      });
      return res.json(consultants);
  },

  async getInvestors(req, res) {
      const { id } = req.params;
      const consultant = await Consultant.findByPk(id);

      if (!consultant) {
          return res.status(400).json({ error: 'Consultor não existe'} );
      }

        const consultants = await Consultant.findByPk(id, {
            include: [
              { association: 'user', required: true },
              {
                  association: 'investors',
                  include : {association: 'user'}
              },
          ]
        });

        return res.json(consultants);
  },

  async getInvestor(req, res) {

    const { id, id_investor } = req.params;

    const consultant = await Consultant.findByPk(id);

    if (!consultant) {
        return res.status(400).json({ error: 'Consultor não existe'} );
    }

    const result = await Consultant.findByPk(id, {
        include: [
          { association: 'user', required: true },
          {
              association: 'investors',
              include : {association: 'user'},
              where : {
                id: id_investor
              }
          },
      ],
      where: {
        id
      }
    });

    if (!result) {
      return res.status(400).json({ error: 'Investidor não existe'} );
    }

    return res.json(result);
  },

  /** Messages */

  async indexMessages(req, res) {

    const { id } = req.params;

    const result = await Consultant.findAll({
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

    const result = await Consultant.findAll({
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
