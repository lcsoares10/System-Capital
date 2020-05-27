const { Model, DataTypes }  = require('sequelize');
//const { DataTypes }  = require('sequelize');
//const SequelizeModel  = require('@/src/class/SequelizeModel');

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
      sequelize
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

}

module.exports = User;
