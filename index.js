// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 3
// Last Modifed: 11.04.2022

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const ejs = require("ejs");

// database connections
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const PORT = process.env.PORT || 8080;

// serving static files ---
router.use(express.static(__dirname+'/docs'));
router.get('/docs/style.css', function(req, res) {
    res.sendFile(path.join(__dirname+'/docs/style.css'));
});

router.use(express.static(__dirname+'/docs/game'));
router.get('/docs/game/game.js', function(req, res) {
    res.sendFile(path.join(__dirname+'/docs/game/game.js'));
});

router.get('/docs/game/game.css', function(res, req) {
    res.sendFile(path.join(__dirname+'/docs/game/game.css'));
});

router.use(express.static(__dirname+'/docs/index'));
router.get('/',function(res,req){
    res.sendFile(path.join(__dirname+'/docs/index/index.html'));
});
// end static files ---
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',router);

app.listen(PORT);

//database implementation
app.post('/submission', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db("db");
        var user = {name: req.body.username, score: req.body.score};
        database.collection("formResults").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted in db");
            db.close();
        });
    });
}); 

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var database = db.db("db");
//     var scoreSort = {score: 1};
//     database.collection("formResults").find().sort(scoreSort).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         console.log(test);
//         db.close();
//     });
// });


// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("testdb");
//     var myobj = { name: "remy", job: "sales "};
//     dbo.collection("dogs").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("remy inserted");
//         db.close();
//     });
// });
