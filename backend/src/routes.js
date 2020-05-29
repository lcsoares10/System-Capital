const express = require('express');
const routes = express.Router();

const UserController = require('@/src/controllers/UserController');
const InvestorController = require('@/src/controllers/InvestorController');
const ConsultantController = require('@/src/controllers/ConsultantController');
const ContractController = require('@/src/controllers/ContractController');
const MessageBoxController = require('@/src/controllers/MessageBoxController');
const ContractPayCompetenceController = require('@/src/controllers/ContractPayCompetenceController');

/** Root */
routes.get('/', async (req, res) => {
    //res.send('Root !!')
    res.json({ hello: 'Hello Word' })

/*     const InvestorClass = require('@/src/class/Investor');
    const Investor = new InvestorClass();

    try {
      //await Investor.load(50);
      const result = await Investor.loadAll();

      //return res.json(Investor._values);
      return res.json(result);

    } catch (er) {
        return res.status(400).json({ error: er.message });
    } */

    //res.json({ hello: 'Hello Word' });

});

/****************************************************************/
/** Users */
routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.get);
routes.get('/user/:id/messages', UserController.getMessages);

/****************************************************************/
/** Investors */
routes.get('/investors', InvestorController.index);
routes.get('/investor/:id', InvestorController.get);
routes.get('/investor/:id/contracts', InvestorController.contracts);

routes.post('/investor', InvestorController.create);
routes.put('/investor/:id', InvestorController.update);
routes.delete('/investor/:id', InvestorController.delete);

/****************************************************************/
/** Consultants */
routes.get('/consultants', ConsultantController.index);
routes.get('/consultant/:id', ConsultantController.get);
routes.get('/consultant/:id/investors', ConsultantController.getInvestors);

routes.post('/consultant', ConsultantController.create);
routes.put('/consultant/:id', ConsultantController.update);
routes.delete('/consultant/:id', ConsultantController.delete);

/****************************************************************/
/** Contracts */
routes.get('/contracts', ContractController.index);
routes.get('/contract/:id', ContractController.get);
routes.get('/contract/:id/contractspaymonth', ContractController.getPayMonth);

routes.post('/contract', ContractController.create);
routes.put('/contract/:id', ContractController.update);
routes.delete('/contract/:id', ContractController.delete);

routes.post('/contract/:id/contractspaymonth', ContractController.createPayMonth);

/****************************************************************/
/** ContractPayCompetences */
routes.get('/contractpaycompetences', ContractPayCompetenceController.index);
routes.get('/contractpaycompetences/:id', ContractPayCompetenceController.get);

routes.put('/contractpaycompetences/:id', ContractPayCompetenceController.update);
routes.delete('/contractpaycompetences/:id', ContractPayCompetenceController.delete);

/****************************************************************/
/** Menssagens Box */
routes.get('/messagesbox', MessageBoxController.index);
routes.get('/messagebox/:id', MessageBoxController.get);

routes.post('/messagebox', MessageBoxController.create);
routes.put('/messagebox/:id', MessageBoxController.update);
routes.delete('/messagebox/:id', MessageBoxController.delete);

module.exports = routes;
