const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

class Util {

  static init() {
  }

  //======================================
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

  //======================================

  //https://medium.com/@thihenos/node-salvando-imagens-em-banco-de-dados-e-convertendo-em-imagens-novamente-1a304880f285
  //Convertendo binario em arquivo
  // static base64_decode_file(base64str, fileName) {
  //   var bitmap = new Buffer (base64str, 'base64');
  //   fs.writeFileSync('src/temp/'+fileName+'',bitmap, 'binary', function (err){
  //     if(err){
  //       console.log('Conversao com erro');
  //     }
  //   } );
  // }

  // //Convertendo arquivo em binário
  // static base64_encode_file(fileName) {
  //   var bitmap = fs.readFileSync('src/temp/'+fileName+'');
  //   return new Buffer (bitmap).toString('base64');
  // }



}
Util.init();

module.exports = Util;
