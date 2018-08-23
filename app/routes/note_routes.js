var ObjectID = require('mongodb').ObjectID;
var utils = require('../functions/utils')

module.exports = function(app, db) {
//WEBHOOK
app.post('/webhook', (req,res) => {
  var reqJson = req.body;
    for (var i = 0; i < reqJson.messages.length; i++) {
      var message = reqJson.messages[i];
      if(message.body=="Clave"){
        //Aca va la persistencia a la DB
        console.log("Phone: " + utils.splitPhone(message.author));
        console.log("Timestamp: " + message.time);
      }
  }
res.send("200 OK")
});
};