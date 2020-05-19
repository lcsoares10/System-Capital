const { Model, DataTypes }  = require('sequelize');

class Consultant extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    super.init({
      //id_user: DataTypes.INTEGER //Até funciona
    }, { 
      sequelize,
      timestamps: false
      //tableName: 'Consultants'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' }); //tem um usuário

    //Relationship Consultant [1 : N] Investor
    this.belongsToMany(models.Investor, { 
      foreignKey: 'id_investor',
      through: 'consultant_investor',
      as: 'investors' 
    });
  }

}

module.exports = Consultant;