const ImageModel = require('@/src/models/Image');
const UserModel = require('@/src/models/User');
const InvestorModel = require('@/src/models/Investor');
const ConsultantModel = require('@/src/models/Consultant');
const ContractModel = require('@/src/models/Contract');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');
const PaginationClass = require('@/src/class/Pagination');

module.exports = {

  /** GET */

  async index(req, res) {

    try {
      const page = req.query.page || 1;
      const options = {
        include: [
          { association: 'user',
           required: true,
           include : {association: 'profile'}
          },
          {
            association: 'consultant',
            include : {association: 'user'}
          }
        ]
      };

      const Pagination = new PaginationClass(InvestorModel);
      const result = await Pagination.select(page, options);

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  async get(req, res) {

    try {
      const { id } = req.params;

      const result = await InvestorModel.findByPk(id,  {
        include: [
          { association: 'user',
           required: true,
           include : {association: 'profile'}
          },
          {
            association: 'consultant',
            include : {association: 'user'}
          }
        ]
      });

      if (!result) {
          throw new Exception("Investidor não existe", "id_investor");
      }

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  /** Contracts */

  async contracts(req, res) {

    try {
      const { id } = req.params;

      const investor = await InvestorModel.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!investor) {
          throw new Exception("Investidor não existe", "id_investor");
      }

      const page = req.query.page || 1;
      const options = {
          where: {
            id_investor: id
          }
        };

      const Pagination = new PaginationClass(ContractModel);
      const result = await Pagination.select(page, options);

      return res.json(Util.response(result));

    } catch (e) {
      const result = Exception._(e);
      return res.status(400).json(Util.response(result));
    }

  },

  /** POST */

  async create(req, res) {

    const t = await InvestorModel.sequelize.transaction();

    try {

      const { id_consultant, ...camposUser } = req.body;
      camposUser.password = UserModel.generateHash(camposUser.password);

      //Consultant
      const consultant = await ConsultantModel.findByPk(id_consultant);
      if (!consultant) {
        throw new Exception("Consultor não existe", "id_consultant");
      }

      //========================
      //Image
      let image;
      if (req.file) {
        const {
          originalname: name, size, filename: key, mimetype: mime,
        } = req.file;

        const url = `${process.env.BASE_URL}/files/${key}`;

        image = await ImageModel.create({
          name, size, key, mime, url
        }, { transaction: t });
      }

      //========================
      //User
      let user = await UserModel.create({
        ...camposUser,
        id_image_profile: (image) ? image.id : null
      }, { transaction: t });

      const investor = await InvestorModel.create({
        id_user: user.id,
        id_consultant
      }
      , { transaction: t });

      const result = {
        ...investor.toJSON(),
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

    const t = await InvestorModel.sequelize.transaction();

    try {
      /** Validações */
      const { id } = req.params;
      let investor = await InvestorModel.findByPk(id,  {
        include: { association: 'user', required: true }
      });
      if (!investor) throw new Exception("Investidor não existe", "id_investor");

      let user = await UserModel.findByPk(investor.id_user, {
        attributes: {
          include: ['password']
        }
      });
      if (!user) throw new Exception("Usuário não existe", "id_user");

      const { id_consultant, ...camposUser } = req.body;
      if (camposUser.password && !user.validPassword(camposUser.password)) {
        camposUser.password = UserModel.generateHash(camposUser.password);
      } else {
        delete(camposUser.password);
      }

      const consultant = await ConsultantModel.findByPk(id_consultant);
      if (!consultant) {
        throw new Exception("Consultor não existe", "id_consultant");
      }

      //=========================
      //Imagem
      let image;
      let updateImg = false;
      let imageDB = image = await ImageModel.findByPk(user.id_image_profile);

      if (req.file) {
        if (!imageDB || imageDB.name != req.file.originalname) {

          const {
            originalname: name, size, filename: key, mimetype: mime,
          } = req.file;
          const url = `${process.env.BASE_URL}/files/${key}`;

          imageNew = await ImageModel.create({
            name, size, key, mime, url
          }, { transaction: t });

          image = imageNew;
          updateImg = true
          //Util.removeFile(req.file.filename); //image.name
        }
      } else if (imageDB) {
        image = null;
        updateImg = true //irá deletar
      }

      //=========================
      /** Update */
      investor = await investor.update({ id_consultant }, { transaction: t });
      user = await user.update({
        ...camposUser,
        id_image_profile: (image) ? image.id : null
      }, { transaction: t });

      //=========================
      //Imagem antiga deve ser deletada e o arquivo removido
      if (updateImg && imageDB) {
        Util.removeFile(imageDB.key);
        await imageDB.destroy( { transaction: t } );
      } else if(req.file && !updateImg) {
        //Arquivo deve ser removido casa não seja usado
        Util.removeFile(req.file.filename);
      }

      //=========================
      const result = {
        ...investor.toJSON(),
        user: { ...user.toJSON(['password', 'updatedAt', 'createdAt'], "e")},
        image: (image) ? { ...image.toJSON(['updatedAt', 'createdAt'], "e")} : null
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

    const t = await InvestorModel.sequelize.transaction();

    try {

      const { id } = req.params;
      let investor = await InvestorModel.findByPk(id,  {
        include: { association: 'user', required: true }
      });

      let user = await UserModel.findByPk(investor.id_user);
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

  }

};

//TESTE
/*   async get(req, res) {
    const InvestorClass = require('@/src/class/Investor');
    const Investor = new InvestorClass();

    try {
      const { id } = req.params;
      await Investor.load(id);

    } catch (er) {
        return res.status(400).json({ error: er.message });
    }

    return res.json(Investor._values);
  }, */
