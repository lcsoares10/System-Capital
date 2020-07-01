const mailer = require("@/src/modules/mailer");

const UserModel = require('@/src/models/User');
const MessageBoxModel = require('@/src/models/MessageBox');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    try {

      const page = req.query.page || 1;
      const options = {
        include: { association: 'profile'}
      };

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

  async getTokenResetPassword(req, res) {

    try {
      const { token } = req.params;
      const user = await UserModel.findOne({
        where: { password_reset_token: token  },
      });

      if (!user) {
          return res.status(400).json({ error: 'Usuário não existe 2'} );
      }

      return res.json(Util.response(user));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async getMessages(req, res) {

    try {
      const { id } = req.params;
      let result = await MessageBoxModel.findAll({
          include: [
          {
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
          {
            association: 'user_send'
          }
        ],
      },);

      if (!result) {
          //return res.status(400).json({ error: 'Usuário não existe'} );
          result = []
      }

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async toggleActive(req, res) {

    try {
      const { id } = req.params;
      let user = await UserModel.findByPk(id);

      await user.update({
        active: (!!user.active) ? 0 : 1,
      });

      return res.json(Util.response(
        user, `${(!!user.active) ? 'Ativado' : 'Desativado'} com Sucesso`
      ));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result, 'Erro ao Ativar usuário'));
    }

  },

  async toggleActivatedUser(req, res) {

    try {
      const { id } = req.params;
      let user = await UserModel.findByPk(id, {
        attributes: {
          include: ['password'],
        },
      });

      user.update({
        active: 1,
        user_activated: (!!user.user_activated) ? 0 : 1,
        user_activated_at: (!!user.user_activated) ? null : new Date(),
      }, { notHash: true });

      //-----------
      //Enviar e-mail
      if (!user.first_login_at && user.user_activated) {
        console.log('E-mail enviado');
        mailer.sendMail({
          to: user.email,
          template: 'login/warn_user_active',
          context: {
            login: user.email,
            password: user.password,
            link: "http://xxxx.com.br"
          },
        }, (err) => {
          if (err)
            throw new Exception(`Erro ao enviar o email de usuário ativo. ${err.message}`);
        });
      }
      //-----------

      return res.json(Util.response(
        user, `${(!!user.user_activated) ? 'Ativado' : 'Desativado'} com Sucesso`
      ));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result, 'Erro ao Ativar usuário'));
    }

  }

};
