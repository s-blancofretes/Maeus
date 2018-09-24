const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var db = require('./config/db');

const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '50mb' }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    db = database.db("progeus18")
    require('./app/routes')(app, db);

    app.listen(process.env.PORT || port, () => {
        console.log('We are live on ' + port);
    });
})