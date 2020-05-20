const { Model, DataTypes }  = require('sequelize');

class Administrator extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      //id_user: DataTypes.INTEGER //Até funciona
    }, { 
      sequelize,
      timestamps: false
    });
  }

  static associate(models) {
    //pertence a
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' }) //tem um usuário
  }

}

module.exports = Administrator;