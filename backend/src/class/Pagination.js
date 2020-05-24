//https://hackernoon.com/how-to-paginate-records-in-mysql-using-sequelize-and-nodejs-a3465d12aad5
//https://imasters.com.br/back-end/restify-e-sequelize-com-node-js-parte-03
//https://www.mcieslar.com/pagination-with-sequelize-explained

class Pagination {

  constructor(model) {
    this._model = model;
    this._pageSize = 15;
  }

  async select(pagenum, options={}) {

    pagenum = parseInt(pagenum);
    if(!pagenum) {
      pagenum = 1;
    }

    const limit = this._pageSize;
    const offset = limit * (pagenum - 1);

    const { rows, count } = await this._model.findAndCountAll(
      {
        ...options,
        offset,
        limit
      },
    );

    return new Promise((resolve, reject) => {
      const out = {
        totreg: count,
        page: pagenum,
        totpages: Math.ceil(count / this._pageSize),
        totrows: rows.length,
        rows,
      }
      resolve(out);
    });
  }

}

module.exports = Pagination;
