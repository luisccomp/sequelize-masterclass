const { Router } = require('express');

const HomeController = require('./controllers/HomeController');
const UserController = require('./controllers/UserController');


const routes = Router();

routes.get('/', HomeController.index);

// Routes handled by UserController.
routes.post('/api/users', UserController.store);
routes.get('/api/users', UserController.index);

module.exports = routes;
