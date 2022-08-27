const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const router = express.Router();

var graph;

router.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname+'/src/index.html'));
});

router.get('/visualizeGraph',(req,res) =>{
    console.log("get request");
    res.json(graph);
});

router.post('/sendGraph', (req,res) => {
    console.log("post request")
    console.log(req.body);
    graph = req.body;
    res.status(302 ).send('Found');
});

//add the router
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/script', express.static(__dirname + '/src/script'));
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Your server available at http://localhost:3000');