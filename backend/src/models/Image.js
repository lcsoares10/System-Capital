const { Model, DataTypes }  = require('sequelize');

class Image extends Model {

  static get _name() {
    return 'Imagens';
  }

  static init(sequelize) { //recebe a conexão do banco de dados
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      size: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      mime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    }, {
      sequelize,
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
      },
    });
  }

  static associate(models) {
    //hasOne [1:1] - Chave estrangeira definida em B
    this.hasOne(models.User, { foreignKey: 'id_image_profile', as: 'profile' });

  }

}
module.exports = Image;
