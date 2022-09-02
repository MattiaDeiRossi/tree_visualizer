const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const router = express.Router();

var graph;
var traversals;

router.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname+'/src/index.html'));
});

router.get('/visualizeTree',(req,res) =>{
    res.json(graph);
});
router.get('/visualizeTraversals',(req,res) =>{
    res.json(traversals);
});

router.post('/sendTree', (req,res) => {
    graph = req.body;
    res.status(302 ).send('Sending Tree...');
});

router.post('/sendTraversals', (req,res) => {
    traversals = req.body;
    res.status(302 ).send('Sending traversals');
});

//add the router
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/script', express.static(__dirname + '/src/script'));
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Your graphs are shown at http://localhost:3000');