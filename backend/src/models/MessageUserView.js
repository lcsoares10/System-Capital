const { Model, DataTypes }  = require('sequelize');

class MessageUserView extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      viewed: DataTypes.INTEGER,
      time_view: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'message_user_view',
    });
  }

}

module.exports = MessageUserView;
