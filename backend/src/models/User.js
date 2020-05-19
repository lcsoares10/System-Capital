const { Model, DataTypes }  = require('sequelize');

class User extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    super.init({
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
    this.hasOne(models.Administrator, { foreignKey: 'id_user', as: 'administrator' });
    this.hasOne(models.Consultant, { foreignKey: 'id_user', as: 'consultant' });
    this.hasOne(models.Investor, { foreignKey: 'id_user', as: 'investor' });
  }

}

module.exports = User;