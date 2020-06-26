const ImageModel = require('@/src/models/Image');
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
        include: {
          association: 'user',
          required: true,
          include: { association: 'profile'}
        }
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
        include: {
          association: 'user',
          required: true,
          include: { association: 'profile'}
        }
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
      //========================
      //Image
      let image;
      if (req.file) {
        image = await ImageModel.create(ImageModel.file2Image(req.file), { transaction: t });
      }

      //========================
      //User
      const { ...camposUser } = req.body

      let user = await UserModel.create({
        ...camposUser,
        id_image_profile: (image) ? image.id : null
      }, { transaction: t });

      const consultant = await ConsultantModel.create({
        id_user: user.id
      }
      , { transaction: t });

      const result = {
        ...consultant.toJSON(),
        user: { ...user.toJSON(['password', 'updatedAt', 'createdAt'], "e")},
        image: (image) ? { ...image.toJSON(['updatedAt', 'createdAt'], "e")} : null
      };

      await t.commit();

      return res.json(Util.response(result, 'Inserido com Sucesso'));

    } catch (e) {
      if (req.file) Util.removeFile(req.file.filename);
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

      if (!consultant) throw new Exception("Consultor não existe", "id_consultant");

      let user = await UserModel.findByPk(consultant.id_user, {
        attributes: {
          include: ['password']
        }
      });

      if (!user) throw new Exception("Usuário não existe", "id_user");

      const { ...camposUser } = req.body;

      //=========================
      //Imagem
      let image;
      let updateImg = false;
      let imageDB = image = await ImageModel.findByPk(user.id_image_profile);

      if (req.file) {

        if (!imageDB || imageDB.name != req.file.originalname) {
          imageNew = await ImageModel.create(ImageModel.file2Image(req.file), { transaction: t });

          image = imageNew;
          updateImg = true
        }

      } else if (imageDB) {
        image = null;
        updateImg = true //irá deletar
      }

      //=========================
      /** Update */
      user = await user.update({
        ...camposUser,
        id_image_profile: (image) ? image.id : null
      }, { transaction: t });

      //=========================
      //Imagem antiga deve ser deletada
      if (updateImg && imageDB) {
        Util.removeFile(imageDB.key);
        await imageDB.destroy( { transaction: t } );
      } else if(req.file && !updateImg) {
        Util.removeFile(req.file.filename);
      }

      //=========================
      const result = {
        ...consultant.toJSON(),
        user: { ...user.toJSON(['password', 'updatedAt', 'createdAt'], "e")},
        image: (image) ? { ...image.toJSON(['updatedAt', 'createdAt'], "e")} : null
      };

      await t.commit();

      return res.json(Util.response(result, 'Alterado com sucesso'));

    } catch (e) {
      if (req.file) Util.removeFile(req.file.filename);
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

      //image
      const image = await ImageModel.findByPk(result.id_image_profile);
      if (image) {
        await image.destroy({ transaction: t });
        await Util.removeFile(image.key);
      }

      await t.commit();

      return res.json(Util.response({
        result,
        profile: { ...image.toJSON() },
      }, 'Deletado com sucesso'));

    } catch (e) {
      await t.rollback();
      const result = Exception._(e);
      return res.status(400).json(Util.response(result, 'Erro ao Deletar'));
    }

  },

  /** Outros*/

};
