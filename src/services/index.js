const inventory = require('./inventory/inventory.service.js');
const sale = require('./sale/sale.service.js');
const product = require('./product/product.service.js');
const message = require('./message/message.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(inventory);
  app.configure(sale);
  app.configure(product);
  app.configure(message);
};
