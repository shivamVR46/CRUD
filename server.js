console.log('Server')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb+srv://admin:admin@cluster0-h77dy.mongodb.net/test?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true
    }, function (err, client) {

        const db = client.db('CRUD')
        const quotesCollection = db.collection('quotes')

        if (err) return console.error(err)

        app.use(bodyParser.urlencoded({ extended: true }))

        app.listen(8081, function () {
            console.log('listening on 8081')
        })


        app.get('/', function (request, response) {
            response.sendFile(/CRUD/ + '/index.html')
        })

        app.post('/quotes', function (request, response) {
            quotesCollection.insertOne(request.body)
            .then(result =>{
                response.redirect('/')
            }).catch(err => console.error(err))
        })
    })


