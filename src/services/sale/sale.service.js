// Initializes the `sale` service on path `/sale`
const createService = require('feathers-sequelize');
const createModel = require('../../models/sale.model');
const hooks = require('./sale.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sale', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sale');

  service.hooks(hooks);
};
