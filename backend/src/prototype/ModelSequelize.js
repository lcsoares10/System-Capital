const { Model } = require('sequelize');

//Pega o metódo original
const toJSON = Model.prototype.toJSON;

//Subistitui pelo novo usando o original intenamente
//type "E" = Excluir, "I" inclui
Model.prototype.toJSON = function (attributes = [], type = "E") {
  const obj = toJSON.call(this);

  //Um "toJson" é feito para cada objet de um select passadno uma
  //String como contador de registros
  //console.log(typeof attributes, attributes, attributes.length);

  if (typeof attributes != 'object' || !attributes.length) return  obj

  if (type.toUpperCase() == 'I') {
    return attributes.reduce((result, attribute) => {
      result[attribute] = obj[attribute];

      return result;
    }, {});
  }

  attributes.map((attribute) => {
    delete obj[attribute];
  }, {});

  return obj;

};
