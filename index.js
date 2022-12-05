// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 3
// Last Modifed: 11.04.2022

// todo:
// data sanitization/valiation
// ui/ux
// fix time - should go away on starting the timer

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');
const sanitize = require('mongo-sanitize');
const validator = require('validatorjs');
const https = require('https');

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

// configurations
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',router);

app.listen(PORT);

//api implementation
// app.get('/api', function(req, res) {
//     axios.get('https://dog.ceo/api/breeds/image/random', {
//     headers: {
//         'Accept-Encoding': 'gzip'
//     }
//     }).then(res2 => {
//         // console.log(res2.data)
//         res.json(res2.data);
//     })
//     .catch(err => console.log(err));
// });

// app.get('/api-breeds', function(req, res) {
//     axios.get('https://dog.ceo/api/breeds/list', {
//     headers: {
//         'Accept-Encoding': 'gzip'
//     }
//     }).then(res2 => {
//         // console.log(res2.data)
//         res.json(res2.data);
//     })
//     .catch(err => console.log(err));
// });

app.get('/api', function(req, res) {
    const options = {
        host: 'dog.ceo',
        path: '/api/breeds/image/random',
        method: 'GET'
    };
        
    // Sending the request
    const request = https.request(options, (res2) => {
        let data = ''
        
        res2.on('data', (chunk) => {
            data += chunk;
        });
        
        // Ending the response 
        res2.on('end', () => {
            console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        });
        
    }).on("error", (err) => {
        console.log("Error: ", err)
    }).end()
});

app.get('/api-breeds', function(req, res) {
    const options = {
        host: 'dog.ceo',
        path: '/api/breeds/list',
        method: 'GET'
    };
        
    // Sending the request
    const request = https.request(options, (res2) => {
        let data = ''
        
        res2.on('data', (chunk) => {
            data += chunk;
        });
        
        // Ending the response 
        res2.on('end', () => {
            console.log(JSON.parse(data));
            res.send(JSON.parse(data));
        });
        
    }).on("error", (err) => {
        console.log("Error: ", err)
    }).end()
});

//database implementation
app.post('/submission', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db("db");

        // sanitization
        var cleanName = sanitize(req.body.username);
        var cleanScore = sanitize(req.body.score);
        var cleanTime = sanitize(req.body.time);

        // validation
        var rules = {
            name: ['required', 'string'],
            score: ['required', 'integer', 'between:0,300'],
            time: ['required' , 'min:0', 'integer']
        }

        var user = {name: cleanName, score: parseInt(cleanScore), time: parseInt(cleanTime)};

        var validation = new validator(user, rules);

        if(validation.passes()){
            database.collection("formResults").insertOne(user, function(err, res) {
                if (err) throw err;
                console.log("one document inserted in db");
                db.close();
            });
        }
    });
}); 

app.get('/leaderboard', function(req, res) {
    MongoClient.connect(url, function(err, db){ 
        if (err) throw err;
        var database = db.db("db");
        database.collection('formResults').find().sort({ score: -1 , time: 1}).toArray(function(err, scoreSort) {
            if (err) res.send({msg: "failed to retrieve players" });
                // console.log(Array.from(scoreSort)); 
                res.render('leaderboard', {'players' : scoreSort});
                db.close();
        });
    });
});