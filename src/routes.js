const { Router } = require('express');

const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AdressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');


const routes = Router();

routes.get('/', HomeController.index);

// Routes handled by UserController.
routes.post('/api/users', UserController.store);
routes.get('/api/users', UserController.index);

// Routes handled by AddressController
routes.post('/api/users/:user_id/addresses', AddressController.store);
routes.get('/api/users/:user_id/addresses', AddressController.index);

// Routes handled by TechController
routes.post('/api/users/:user_id/techs', TechController.store);
routes.get('/api/users/:user_id/techs', TechController.index);
routes.delete('/api/users/:user_id/techs', TechController.remove);

routes.get('/api/report', ReportController.show);

module.exports = routes;
