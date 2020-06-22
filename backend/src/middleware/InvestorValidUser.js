const InvestorModel = require('@/src/models/Investor');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');

module.exports = async (req, res, next) => {

  if (process.env.DESENVOLVIMENTO == 'true') return next();

  try {

    const { id } = req.params;
    const investor = await InvestorModel.findByPk(id);
    if (!investor) {
      res.status(404);
      throw new Exception("Investidor não existe");
    }

    if (investor.id_user != req.user.id_user && !req.user.is_admin ) {
      res.status(401);
      throw new Exception("Você não tem direito de acesso");
    }
    return next();

  } catch (e) {
    const result = Exception._(e);
    return res.status(401).json(Util.response(result));
  }

}
