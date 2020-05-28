const UserModel = require('@/src/models/User');
const InvestorModel = require('@/src/models/Investor');
const ConsultantModel = require('@/src/models/Consultant');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  async index(req, res) {

    try {
      const page = req.query.page || 1;
      const options = {
        include: { association: 'user', required: true }
      };

      const Pagination = new PaginationClass(ConsultantModel);
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
      const consultant = await ConsultantModel.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!consultant) {
        if (!consultant) throw new Exception("Consultor não existe", "id_consultant");
      }

      return res.json(consultant);

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  /** Investors */

  async getInvestors(req, res) {

    try {

      const { id } = req.params;
      const consultant = await ConsultantModel.findByPk(id);

      if (!consultant) {
        if (!consultant) throw new Exception("Consultor não existe", "id_consultant");
      }

      const page = req.query.page || 1;
      const options = {
        include: { association: 'user', required: true },
        where: {
          id_consultant: id
        }
      };

      const Pagination = new PaginationClass(InvestorModel);
      const result = await Pagination.select(page, options);

      return res.json(result);

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  /** POST */

  async create(req, res) {

    const t = await ConsultantModel.sequelize.transaction();

    try {

      const { ...camposUser } = req.body

      let user = await UserModel.create(camposUser, { transaction: t });
      const consultant = await ConsultantModel.create({
        id_user: user.id
      }
      , { transaction: t });

      const result = {
        ...consultant.toJSON(),
        //user: { ...user.toJSON(['password', 'updatedAt', 'createdAt'], "e")}
        user: { ...user.toJSON()}
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

    const t = await ConsultantModel.sequelize.transaction();

    try {
      /** Validações */

      const { id } = req.params;
      let consultant = await ConsultantModel.findByPk(id,  {
        include: { association: 'user', required: true }
      });
      if (!consultant) throw new Exception("Investidor não existe", "id_consultant");

      let user = await UserModel.findByPk(consultant.id_user);
      if (!user) throw new Exception("Usuário não existe", "id_user");

      const { ...camposUser } = req.body;

      /** Update */

      user = await user.update(camposUser, { transaction: t });

      const result = {
        ...consultant.toJSON(),
        user: { ...user.toJSON() }
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

    const t = await ConsultantModel.sequelize.transaction();

    try {

      const { id } = req.params;
      let consultant = await ConsultantModel.findByPk(id,  {
        include: { association: 'user', required: true }
      });
      if (!consultant) throw new Exception("Consultor não existe", "id_consultant");

      let user = await UserModel.findByPk(consultant.id_user);
      if (!user) throw new Exception("Usuário não existe", "id_user");

      //const result = await investor.destroy({ transaction: t });
      const result = await user.destroy({ transaction: t });

      await t.commit();

      return res.json(Util.response(result, 'Deletado com sucesso'));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result, 'Erro ao Deletar'));
    }

  }

};
