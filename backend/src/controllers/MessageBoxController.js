const MessageBoxModel = require('@/src/models/MessageBox');
const UserModel = require('@/src/models/User');
const InvestorModel = require('@/src/models/Investor');
const ConsultantModel = require('@/src/models/Consultant');
const MessageUserViewModel = require('@/src/models/MessageUserView');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    try {
      const page = req.query.page || 1;
      const options = {};

      const Pagination = new PaginationClass(MessageBoxModel);
      const result = await Pagination.select(page, options);

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result, 'Erro ao Deletar'));
    }

  },

  async get(req, res) {

    try {
      const { id } = req.params;

      const result = await MessageBoxModel.findByPk(id,  {
          include: {
            association: 'user', required: true
          },
          where : {
            id
          }
      });

      if (!result) {
          return res.status(400).json(Util.response(result, 'Mensagem não existe'));
      }

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result, 'Erro ao Deletar'));
    }

  },

  /** POST */

  async create(req, res) {

    const t = await MessageBoxModel.sequelize.transaction();

    try {

      const { id_user } = req.headers;
      let user = await UserModel.findByPk(id_user);
      if (!user) throw new Exception("Usuário não existe");

      const campos = { ...req.body, id_user_send: id_user};

      const message = await MessageBoxModel.create(campos, { transaction: t });
      const result = { ...message.toJSON() };

      //=============
      //enviar msg
      let users;
      let key;
      switch (campos.to_group_user) {
        case 1:
          //investidores
          users = await InvestorModel.findAll();
          key = 'id_user';
          break;

        case 2:
          //consultores
          users = await ConsultantModel.findAll();
          key = 'id_user';
          break;

        default:
          //Todos
          users = await UserModel.findAll();
          key = 'id';
          break;
      }

      users = users.map((item) => {
        let id;

        if (key == 'id_user') id = item.id_user;
        else id = item.id;

        let out = { id_user: id, id_message_box: message.id };
        return out;
      });

      console.log(users);

      await MessageUserViewModel.bulkCreate(users, { transaction: t });
      //=============

      await t.commit();

      return res.json(Util.response(result, 'Enviado com Sucesso'));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

};
