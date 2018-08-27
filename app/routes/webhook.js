var ObjectID = require('mongodb').ObjectID;
var utils = require('../functions/utils')
var whatsapp = require('../functions/whatsapp')

module.exports = function(app, db) {
//WEBHOOK
app.post('/webhook', (req,res) => {
  var reqJson = req.body;
    for (var i = 0; i < reqJson.messages.length; i++) {
      var message = reqJson.messages[i];
      if(message.body=="Clave"){
        //whatsapp.sendMessage(message.author,"Respuesta Superautomatica")
        whatsapp.sendFile(message.author,'Currywurst','https://ais.kochbar.de/kbrezept/515109_897054/620x465/currywurst-gulasch-mit-backkartoffeln-rezept-bild-nr-4945.jpg')
        //Aca va la persistencia a la DB
        console.log("Phone: " + utils.splitPhone(message.author));
        console.log("Timestamp: " + message.time);
      }
  }
res.send("200 OK")
});
};