const SequelizeExeption = require('./SequelizeExeption');

class Exception {

  constructor(message, campo, codigo) {
    this.name = 'Exception';
    this.message = message || 'Erro Desconhecido';
    this.campo = campo || null;
    this.codigo = codigo || null;
    this.stack = (new Error()).stack;
  }

  static _(e) {

    this._errorJson = JSON.parse(JSON.stringify(e));
    this._error = e;

    console.log(this._error.stack);

    switch (true) {
      case (SequelizeExeption.isSequelizeException(this._error)):
        return SequelizeExeption.SequelizeExeption(this._error);

      case (this._isError(this._error)):
        return {
          type: this._error.name,
          message: this._error.message,
          "id": null
        };

      default:
        return {
          type: this._error.name,
          message: this._error.message,
          "id": this._error.campo
        };
        break;
    }

  }

  static _isError(err) {
    return (err.name == 'Error');
  }

}

module.exports = Exception;
