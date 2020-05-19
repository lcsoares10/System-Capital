module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root', 
  password: '31510736Igor*',
  database: 'pwa_fi',
  define: {
    timestamps: true, /** faz com q todas as tabelas tenham as colunas created_at, updated_at */
    underscored: true /** faz os nomes das tableas e campos separador por _ */
  }
}