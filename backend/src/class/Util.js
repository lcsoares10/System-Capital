class Util {

  static init() {
  }

  static fileExist(path) {
    const fs = require('fs');
    fs.access(path, fs.F_OK, (err) => {
      if (err) return false;
      return true
    })
  }

  static response(data, message='') {

    let typeData = typeof data;

    if (message == '' && (data && data.length > 0)) {
      typeData = 'Array';
      let aux = [];
      data.map((obj) => {
        if (obj.message) aux.push(obj.message);
      });
      message = aux.join(', ');
    }

    message = message || data.message || null
    return { message, typeData, data }

  }

}
Util.init();

module.exports = Util;
