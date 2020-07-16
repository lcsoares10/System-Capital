const { Model, DataTypes }  = require('sequelize');

const moment = require('moment');

class Contract extends Model {

  static get _name() {
    return 'Contrato';
  }

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      begin: { //início
        alias: 'Início',
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      final: { //final
        alias: 'Final',
        type: DataTypes.VIRTUAL,
        get: function() {
          if (this.break_contract) {
            return moment(this.break_contract);
          } else {
            return moment(this.begin).add(this.time, 'month').add(-1, 'day');
          }
        }
      },
      break_contract: { //quebra de contrato - Recebe valor caso o contrato seja encerrado antes do prazo original
        alias: 'Qubra de Contrato',
        type: DataTypes.DATE,
        allowNull: true
      },
      day: { //dia do pagamento
        alias: 'Dia',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 1,
          max: 31
        }
      },
      time: { //Prazo
        alias: 'Prazo',
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      value: {
        alias: 'Valor',
        type: DataTypes.FLOAT,
        allowNull: false
      },
      charging_rate: {
        alias: 'Taxa de carregamento',
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
