const { Model, DataTypes }  = require('sequelize');

class ContractPayCompetence extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      value: DataTypes.FLOAT,
      competence: DataTypes.STRING(6),
      id_user: DataTypes.INTEGER,
    }, { 
      sequelize,
      //tableName: 'Contract_pay_competence',
      //modelName: 'ContractPayCompetence'
    });
  }

  static associate(models) {
    //belongsTo [1:1] - Chave estrageira definida em A
    this.belongsTo(models.Contract, { foreignKey: 'id_contract', as: 'contract' }); //tem um contract
  }

}

module.exports = ContractPayCompetence;