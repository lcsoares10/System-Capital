class User {
  constructor() {
    /** Atributos */
    this._string = null;
    this._tipo = null;
    this._model = null;

    this._values = null;
  }

}

class Investor extends User {

  constructor() {
    super();
    /** Atributos */
    this._string = 'Investidor';
    this._tipo = 'investor';
    this._model = require('@/src/models/Investor');
  }

  async loadAll() {

    return await this._model.findAll({
      include: [
          { association: 'user', required: true },
          {
              association: 'consultant',
              include : {association: 'user'}
          }
      ]
    });

  }

  /** ========= */

  async load(id) {

      this._values = await this._model.findByPk(id,  {
          include: { association: 'user', required: true }
      });

      if (!this._values) {
        throw new Error (`${this._string} não existe`);
      }

      this._values = this._values.toJSON();
  }

}

module.exports = Investor;
