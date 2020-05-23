const { Model, DataTypes }  = require('sequelize');

class MessagesBox extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      messagem: DataTypes.TEXT,
      to_group_user: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'messages_box',
    });
  }

  static associate(models) {
    //belongsTo [1:1] - Chave estrageira definida em A
    this.belongsTo(models.Administrator, {
      foreignKey: 'id_administrator', as: 'administrator'
    });

    //belongsToMany [N:N]
    this.belongsToMany(models.User, {
      through: 'MessageUserView',
      foreignKey: 'id_message_box',
      as: 'users',
    });

  }

}

module.exports = MessagesBox;
