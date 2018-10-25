const webhookRoutes = require('./webhook');

module.exports = function(app, db) {
  webhookRoutes(app, db);
};