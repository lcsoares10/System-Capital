const MessageBoxModel = require('@/src/models/MessageBox');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');

module.exports = async (req, res, next) => {

  try {

    const { id } = req.params;
    const message = await MessageBoxModel.findByPk(id,  {
      include: {
        association: 'users',
        required: true,
        where: {
          id: req.user.id_user
        }
      },
      where : {
        id
      }
    });

    //console.log(req.user, message.toJSON());

    if (!message && !req.user.is_admin ) {
      throw new Exception("Você não tem diretiso de acesso");
    }

    return next();

  } catch (e) {
    const result = Exception._(e);
    return res.status(401).json(Util.response(result));
  }

}
