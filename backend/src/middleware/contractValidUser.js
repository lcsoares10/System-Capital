const ContractModel = require('@/src/models/Contract');

const Util = require('@/src/class/Util');
const Exception = require('@/src/class/Exeption');

module.exports = async (req, res, next) => {

  try {

    const { id } = req.params;
    const contract = await ContractModel.findByPk(id);
    if (!contract) {
      throw new Exception("Contrato não existe");
    }

    // console.log(
    //   contract.id_investor,
    //   req.user.id,
    //   req.user.is_admin,
    // );

    if (contract.id_investor != req.user.id && !req.user.is_admin ) {
      throw new Exception("Você não tem diretiso de acesso");
    }
    return next();

  } catch (e) {
    const result = Exception._(e);
    return res.status(401).json(Util.response(result));
  }

}
