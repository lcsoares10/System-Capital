const express = require('express');
const routes = express.Router();

const UserController = require('@/src/controllers/UserController');
const InvestorController = require('@/src/controllers/InvestorController');
const ConsultantController = require('@/src/controllers/ConsultantController');
const AdministratorController = require('@/src/controllers/AdministratorController');
const ContractController = require('@/src/controllers/ContractController');
const MessagesBoxController = require('@/src/controllers/MessagesBoxController');
//const ContractPayCompetence = require('@/src/controllers/ContractPayCompetenceController');

/** Root */
routes.get('/', (req, res) => (
    //res.send('Root !!')
    res.json({ hello: 'Hello Word' })
));

/** Users */
routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.get);
routes.get('/user/:id/messages', UserController.getMessages);

/****************************************************************/
/** Investors */
routes.get('/investors', InvestorController.index);
routes.get('/investor/:id', InvestorController.get);

routes.get('/investor/:id/messages', InvestorController.indexMessages);
routes.get('/investor/:id/message/:id_message_box', InvestorController.getMessage);

/****************************************************************/
/** Consultants */
routes.get('/consultants', ConsultantController.index);
routes.get('/consultant/:id', ConsultantController.get);

routes.get('/consultants/investors', ConsultantController.indexInvestors);
routes.get('/consultant/:id/investors', ConsultantController.getInvestors);
routes.get('/consultant/:id/investor/:id_investor', ConsultantController.getInvestor);

routes.get('/consultant/:id/messages', ConsultantController.indexMessages);
routes.get('/consultant/:id/message/:id_message_box', ConsultantController.getMessage);

/****************************************************************/
/** Administrators */
routes.get('/administrators', AdministratorController.index);
routes.get('/administrator/:id', AdministratorController.get);

routes.get('/administrator/:id/messages', AdministratorController.indexMessages);
routes.get('/administrator/:id/message/:id_message_box', AdministratorController.getMessage);

/****************************************************************/
/** Contracts */
routes.get('/contracts', ContractController.index);
routes.get('/contract/:id', ContractController.get);

//
routes.get('/contracts/contractpaymonths', ContractController.indexPayMonth);
routes.get('/contracts/:id/contractspaymonth', ContractController.getPayMonth);

/****************************************************************/
/** ContractPayCompetences (não sei se deve ser uma rota !!!) */
//routes.get('/contractspaymonth', ContractPayCompetencesController.index);
//routes.get('/contractspaymonth/:id', ContractPayCompetencesController.get);

/****************************************************************/
/** Menssagens Box */
routes.get('/messagesbox', MessagesBoxController.index);
routes.get('/messagebox/:id', MessagesBoxController.get);

module.exports = routes;
