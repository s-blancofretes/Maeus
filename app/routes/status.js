var database = require('../functions/database');

module.exports = function(app, db) {
    //Returns active users count
    app.get('/active', async(req, res) => {
        var count = await database.getActiveUsersCount(db);
        res.json({
            count: count
        });
    })
}