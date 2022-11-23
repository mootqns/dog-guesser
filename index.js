// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 3
// Last Modifed: 11.04.2022

const breeds = require('dog-breeds');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

// module.exports = {
//     dogBreedName: 
    

export function dogBreedName() {
    return breeds.random().name;
}

// }

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

app.use('/',router);
app.listen(process.env.port || 8080);
