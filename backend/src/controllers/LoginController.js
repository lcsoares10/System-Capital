const jwt = require('jsonwebtoken');
const authConfig = require('@/src/config/auth');

const UserModel = require('@/src/models/User');
const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');

//https://www.youtube.com/watch?v=aVAl8GzS0d0

module.exports = {

  async login(req, res) {

    try {

      /**
       * Por algum motivo as associações do findOne vem como String
       * talvez seja por causa da associção hasOne
       */

      const { email, password } = req.body;
      let user = await UserModel.findOne( {
        include: [
          { association: 'investor', },
          { association: 'consultant' }
        ],
        attributes: {
          include: ['password']
        },
        where: {
          email
        }
      });

      if (!user) throw new Exception("Usuário ou senha incorretos");

      if (!user.validPassword(password)) {
        throw new Exception("Usuário ou senha incorretos");
      }

      //console.log( JSON.stringify(user.investor, null, 2) );
      //console.log( JSON.stringify(user.consultant, null, 2) );

      let id;
      let type;

      switch (true) {
        case (user.investor != null):
          id = user.investor.id;
          type = 'investor';
          break;
        case (user.consultant != null):
          id = user.consultant.id;
          type = 'consultant';
          break;

      }

      //throw new Exception("Usuário ou senha incorretos");

      //voltar investidor ou consultor ...

      const result = {
        id,
        type,
        id_user: user.id,
        login: user.login,
        email: user.email,
        name: user.name,
        is_admin: user.is_admin
      }

      //==========
      //JWT Token
      //https://www.youtube.com/watch?v=KKTX1l3sZGk
      //https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout

      const token = jwt.sign({ user: result }, authConfig.secret, {
        expiresIn: 86400 //1 dia
      });
      //==========

      return res.json(Util.response({ ...result, token }, 'Logado com Sucesso'));

    } catch (e) {
      console.log(e);
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

};
