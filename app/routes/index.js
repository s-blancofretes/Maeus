const webhookRoutes = require('./webhook');
const statusRoutes = require('./status');

module.exports = function(app, db) {
  webhookRoutes(app, db);
  statusRoutes(app, db);
};