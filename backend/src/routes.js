const express = require('express');
const routes = express.Router();

const UserController = require('@/src/controllers/UserController');
const InvestorController = require('@/src/controllers/InvestorController');
const ConsultantController = require('@/src/controllers/ConsultantController');
const AdministratorController = require('@/src/controllers/AdministratorController');
const ContractController = require('@/src/controllers/ContractController');
const MessageBoxController = require('@/src/controllers/MessageBoxController');
//const ContractPayCompetence = require('@/src/controllers/ContractPayCompetenceController');

/** Root */
routes.get('/', async (req, res) => {
    //res.send('Root !!')
    //res.json({ hello: 'Hello Word' })

    const InvestorClass = require('@/src/class/Investor');
    const Investor = new InvestorClass();

    try {
      //await Investor.load(50);
      const result = await Investor.loadAll();

      //return res.json(Investor._values);
      return res.json(result);

    } catch (er) {
        return res.status(400).json({ error: er.message });
    }

    //res.json({ hello: 'Hello Word' });

});

/** Users */
routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.get);
routes.get('/user/:id/messages', UserController.getMessages);

/****************************************************************/
/** Investors */
routes.get('/investors', InvestorController.index);
routes.get('/investor/:id', InvestorController.get);

routes.get('/investor/:id/contracts', InvestorController.indexContracts);

/****************************************************************/
/** Consultants */
routes.get('/consultants', ConsultantController.index);
routes.get('/consultant/:id', ConsultantController.get);

//routes.get('/consultants/investors', ConsultantController.indexInvestors);
routes.get('/consultant/:id/investors', ConsultantController.getInvestors);

/****************************************************************/
/** Administrators */
routes.get('/administrators', AdministratorController.index);
routes.get('/administrator/:id', AdministratorController.get);

/****************************************************************/
/** Contracts */
routes.get('/contracts', ContractController.index);
routes.get('/contract/:id', ContractController.get);

routes.get('/contracts/contractpaymonths', ContractController.indexPayMonth);
routes.get('/contracts/:id/contractspaymonth', ContractController.getPayMonth);

/****************************************************************/
/** ContractPayCompetences (não sei se deve ser uma rota !!!) */
//routes.get('/contractspaymonth', ContractPayCompetencesController.index);
//routes.get('/contractspaymonth/:id', ContractPayCompetencesController.get);

/****************************************************************/
/** Menssagens Box */
routes.get('/messagesbox', MessageBoxController.index);
routes.get('/messagebox/:id', MessageBoxController.get);

module.exports = routes;
