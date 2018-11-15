const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var db = require('./config/db');
var crono = require('./app/functions/crono');
var dialogflow = require('./app/functions/dialogflow');

const app = express();

const port = 8000;

app.use(bodyParser.json())

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    db = database.db("progeus18")
    require('./app/routes')(app, db);

    app.listen(process.env.PORT || port, () => {
        console.log('We are live on ' + port);
    });
    crono.crono(db);
})