const UserModel = require('@/src/models/User');
const InvestorModel = require('@/src/models/Investor');
const ContractModel = require('@/src/models/Contract');
const ContractPayCompetenceModel = require('@/src/models/ContractPayCompetence');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');
const PaginationClass = require('@/src/class/Pagination');
const moment = require('moment');

module.exports = {

  async index(req, res) {

    try {
      const page = req.query.page || 1;
      const options = {
        include: [
          {
            association: 'investor',
            required: true,
            include : {association: 'user'}
          }
        ]
      };

      const Pagination = new PaginationClass(ContractModel);
      const result = await Pagination.select(page, options);

      return res.json(result);

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async get(req, res) {

    try {
      const { id } = req.params;
      const result = await ContractModel.findByPk(id,  {
          include: [
              {
                  association: 'investor',
                  required: true,
                  include : {association: 'user'}
              }
          ]
      });

      if (!result) {
        throw new Exception("Contrato não existe");
      }

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async getPayMonth(req, res) {

    try {
      const { id } = req.params;
      const contract = await ContractModel.findByPk(id);

      if (!contract) {
        throw new Exception("Contrato não existe");
      }

      const { begin, time } = contract;

      let dt_begin = moment(begin).add(1, 'month');
      let dt_end = moment(dt_begin).add(time, 'month');

      const payMonths = await ContractPayCompetenceModel.findAll({
        where: {
          id_contract: id
        }
      });

      const aux = [];
      while (dt_begin.format('YMM') <= dt_end.format('YMM')) {

        let months = {
          competence: dt_begin.format('YMM'),
          competence_: dt_begin.format('MM/Y'),
          value: 0,
          pay: 0
        }

        let idx = payMonths.findIndex((item) => {
          return item.competence == dt_begin.format('YMM');
        });

        if (payMonths[idx]) {
          months.competence = payMonths[idx].competence;
          months.competence_ = dt_begin.format('MM/Y');
          months.value = payMonths[idx].value;
          months.pay = 1;
        }

        aux.push(months);

        dt_begin.add(1, 'month');
      }

      return res.json(Util.response({ contract: contract, payMonths: aux}));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  /** POST */

  async create(req, res) {

    const t = await ContractModel.sequelize.transaction();

    try {

      const { ...campos } = req.body

      const investor = await InvestorModel.findByPk(campos.id_investor,  {
        include: { association: 'user', required: true }
     });

      if (!investor) {
          throw new Exception("Investidor não existe", "id_investor");
      }

      const contract = await ContractModel.create(campos, { transaction: t });

      const result = {
        ...contract.toJSON(),
        investor: { ...investor.toJSON() }
      };

      await t.commit();

      return res.json(Util.response(result, 'Inserido com Sucesso'));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }
  },

  async update(req, res) {

    const t = await ContractModel.sequelize.transaction();

    try {
      /** Validações */

      const { id } = req.params;
      let contract = await ContractModel.findByPk(id);
      if (!contract) throw new Exception("Contrato não existe", "id_contract");

      const { ...campos } = req.body

      const investor = await InvestorModel.findByPk(campos.id_investor,  {
        include: { association: 'user', required: true }
     });

      if (!investor) {
        throw new Exception("Investidor não existe", "id_investor");
      }

      contract = await contract.update(campos, { transaction: t });

      const result = {
        ...contract.toJSON(),
        investor: { ...investor.toJSON() }
      };

      await t.commit();

      return res.json(Util.response(result, 'Alterado com sucesso'));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async delete(req, res) {

    const t = await ContractModel.sequelize.transaction();

    try {

      const { id } = req.params;
      let contract = await ContractModel.findByPk(id);
      if (!contract) throw new Exception("Contrato não existe", "id_contract");

      const result = await contract.destroy({ transaction: t });

      await t.commit();

      return res.json(Util.response(result, 'Deletado com sucesso'));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result, 'Erro ao Deletar'));
    }

  },

  async createPayMonth(req, res) {

    const t = await ContractModel.sequelize.transaction();

    try {

      const { id } = req.params;
      let contract = await ContractModel.findByPk(id);
      if (!contract) throw new Exception("Contrato não existe", "id_contract");

      const { id_user } = req.user;
      let user = await UserModel.findByPk(id_user);
      if (!user) throw new Exception("Usuário não existe");

      const campos = { ...req.body, id_contract: id, id_user_pay: id_user };

      const paymonth = await ContractPayCompetenceModel.create(campos, { transaction: t });
      const result = { ...paymonth.toJSON() };

      await t.commit();

      return res.json(Util.response(result, 'Inserido com Sucesso'));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }
  },

};
