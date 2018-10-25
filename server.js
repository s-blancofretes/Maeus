const express = require('express');
const MongoClient = require('mongodb-promise').MongoClient;
const bodyParser = require('body-parser');
var db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.json())

MongoClient.connect(db.url).then((err, database) => {
    if (err) return console.log(err)
    db = database.db("progeus18")
    require('./app/routes')(app, db);

    app.listen(process.env.PORT || port, () => {
        console.log('We are live on ' + port);
    });
})