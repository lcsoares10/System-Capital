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
          notEmpty: true,
        }
      },
      final: {
        alias: 'Final',
        type: DataTypes.VIRTUAL(DataTypes.DATE),
        get() {
          if (this.break_contract) {
            return moment(this.break_contract);
          } else {
            return moment(this.begin).add(this.time, 'month').add(-1, 'day');
          }
        }
      },
      is_vigente: {
        alias: 'Vigente',
        type: DataTypes.VIRTUAL(DataTypes.INTEGER),
        get() {
          const today = moment().format('YYYYMMDD');
          const begin = moment(this.begin).format('YYYYMMDD');
          const final = moment(this.final).format('YYYYMMDD');

          return (today >= begin && today <= final );
        }
      },
      xstatus: {
        alias: 'Vigente',
        type: DataTypes.VIRTUAL(DataTypes.STRING),
        get() {

          let status = "";
          switch (true) {
            case (this.contract_active === 0):
              status = "desativado"
              break;

            case (this.contract_active === 1 && moment().format('YMMDD') < moment(this.begin).format('YMMDD')):
              status = "ativado"
              break;

              case (this.contract_active === 1 && moment().format('YMMDD') > moment(this.final).format('YMMDD')):
              status = "encerrado"
              break;

            default:
              status = "vigente"
              break;
          }

          return status;
        }
      },
      break_contract: { //quebra de contrato - Recebe valor caso o contrato seja encerrado antes do prazo original
        alias: 'Rescisão de Contrato',
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          inValidDate(value) {
            if (moment(value).format('YMMDD') < moment(this.begin).format('YMMDD')) {
              throw new Error('Data de encerramento do contrato não pode ser menor que a data de início');
            }
            if (moment(value).format('YMMDD') > moment(this.begin).add(this.time, 'month').format('YMMDD')) {
              throw new Error('Data de encerramento do contrato não pode ser maior que a data final');
            }
          }
        }
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
        },
        beforeUpdate: (self, options) => {
          self.time = moment(self.break_contract).diff(self.previous('begin'), 'month');
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
