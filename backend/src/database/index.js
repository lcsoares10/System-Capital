const Sequelize = require('sequelize');
const dbConfig = require('@/src/config/database');

//Refatorar com consign ou require-directory (npm)
const User = require('@/src/models/User');
const Administrator = require('@/src/models/Administrator');
const Consultant = require('@/src/models/Consultant');
const Investor = require('@/src/models/Investor');

const dbs = new Sequelize(dbConfig);

User.init(dbs);
Administrator.init(dbs);
Consultant.init(dbs);
Investor.init(dbs);

User.associate(dbs.models);
Investor.associate(dbs.models);
Consultant.associate(dbs.models);
Administrator.associate(dbs.models);

module.exports = dbs;