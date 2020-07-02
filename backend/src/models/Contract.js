const { Model, DataTypes }  = require('sequelize');

class Contract extends Model {

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      begin: { //início
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      day: { //dia do pagamento
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 1,
          max: 31
        }
      },
      time: { //Prazo
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      charging_rate: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      contract_active: DataTypes.INTEGER,
      contract_active_date: DataTypes.DATE,
    }, {
      hooks: {
        beforeValidate: (self, options) => {
          self.charging_rate = self.value * 0.15;
        }
      },
      sequelize,
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
      }
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
