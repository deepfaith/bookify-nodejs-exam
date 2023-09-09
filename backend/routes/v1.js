const mapRoutes = require("express-routes-mapper");
const auth = require("../api/policies/auth.policy");
const app = require('./index');

// USER ROUTES
app.use('/api/',
  mapRoutes({
      'GET /test'  : 'AuthenticationController.test',
      'POST /register'  : 'AuthenticationController.register',
      'POST /login'  : 'AuthenticationController.login',
      'POST /forgot-password'  : 'AuthenticationController.forgotPassword',
  }, './api/controllers/')
);

module.exports = app;
