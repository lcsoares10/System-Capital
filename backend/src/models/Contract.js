const { Model, DataTypes }  = require('sequelize');

class Contract extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      begin: DataTypes.DATE,
      time: DataTypes.INTEGER,
      value: DataTypes.FLOAT,
    }, { 
      sequelize
    });
  }

  static associate(models) {
    //belongsTo [1:1] - Chave estrageira definida em A
    this.belongsTo(models.Investor, { foreignKey: 'id_investor', as: 'investor' }); //tem um investidor

    //hasMany [1:N] - Chave estrageira definida em B
    this.hasMany(models.ContractPayCompetence, { foreignKey: 'id_contract', as: 'contractPayCompetences' }); //tem um investidor
  }

}

module.exports = Contract;