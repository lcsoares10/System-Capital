const { Model, DataTypes }  = require('sequelize');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
=======
//const { DataTypes }  = require('sequelize');
//const SequelizeModel  = require('@/src/class/SequelizeModel');
>>>>>>> master

class User extends Model {

  static get _name() {
    return 'Usuário';
  }

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-z]+$/i
        }
      },
      //Vê validador de senha
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
          //tem q por mais coisas
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-z]+$/i
        }
      },
      is_admin: DataTypes.INTEGER,
      active: DataTypes.INTEGER
    }, {
      sequelize,
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']
        },
      },
    });
  }

  static associate(models) {
    //hasOne [1:1] - Chave estrangeira definida em B
    this.hasOne(models.Consultant, { foreignKey: 'id_user', as: 'consultant' });
    this.hasOne(models.Investor, { foreignKey: 'id_user', as: 'investor' });

    //belongsToMany [N:N]
    this.belongsToMany(models.MessageBox, {
      //through: 'message_user_view',
      through: 'MessageUserView',
      foreignKey: 'id_user',
      as: 'messages_box'
    });

  }

  //https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt **
  //https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
  //https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

  //generating a hash
  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

}

//Prototype (Disponível no retorno de uma instâcia)
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = User;
