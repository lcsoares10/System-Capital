class Util {

  static fileExist(path) {
    const fs = require('fs');
    fs.access(path, fs.F_OK, (err) => {
      if (err) return false;
      return true
    })
  }

}

module.exports = Util;
