const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');

module.exports = (req, res, next) => {

  try {

    if (req.user.is_admin == 0) {
      throw new Exception("Você não é um administrador");
    }

    return next();

  } catch (e) {
    const result = Exception._(e);
    return res.status(401).json(Util.response(result));
  }

}
