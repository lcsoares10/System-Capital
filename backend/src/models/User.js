const { Model, DataTypes }  = require('sequelize');

class User extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      login: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      is_admin: DataTypes.INTEGER,
      active: DataTypes.INTEGER
    }, {
      sequelize
    });
  }

  static associate(models) {
    //hasOne [1:1] - Chave estrangeira definida em B
    this.hasOne(models.Administrator, { foreignKey: 'id_user', as: 'administrator' });
    this.hasOne(models.Consultant, { foreignKey: 'id_user', as: 'consultant' });
    this.hasOne(models.Investor, { foreignKey: 'id_user', as: 'investor' });

    //belongsToMany [N:N]
    this.belongsToMany(models.MessagesBox, {
      //through: MessageUserView,
      through: 'MessageUserView',
      foreignKey: 'id_user',
      as: 'messages_box'
    });

  }

}

module.exports = User;
