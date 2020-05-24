//onst config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development
const env = process.env.NODE_ENV || "development"; // use process environment

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: true, /** faz com q todas as tabelas tenham as colunas created_at, updated_at */
      underscored: true /** faz os nomes das tableas e campos separador por _ */
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  }
}

module.exports = config[env];
