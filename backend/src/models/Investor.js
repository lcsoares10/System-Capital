const { Model, DataTypes }  = require('sequelize');

class Investor extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    super.init({
      //id_user: DataTypes.INTEGER //Até funciona
    }, { 
      sequelize,
      timestamps: false,
      //tableName: 'Investors'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' }); //tem um usuário

    //Relationship Investor [1 : 1] Consultant
    this.hasOne(models.Consultant, { 
      foreignKey: 'id_consultant', 
      through: 'consultant_investor', 
      as: 'consultant' 
    });
  }

}

module.exports = Investor;