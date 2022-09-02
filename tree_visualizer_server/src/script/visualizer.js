/**
 * @author Mattia Dei Rossi
 */
const visualize_tree_url = "http://localhost:3000/visualizeTree";
const visualize_traversals = "http://localhost:3000/visualizeTraversals";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = 500;
const height = 1200;
ctx.width = width;
ctx.height = height;

function getDataGraph(){
    //clear previous
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let req = new XMLHttpRequest();
    req.open("GET", visualize_tree_url, true); // true for asynchronous
    req.responseType = 'json';

    req.onload = function() {
        json_graph = JSON.parse(JSON.stringify(req.response));
        //console.log(json_graph)
        let root = deserializeTree(json_graph);
        drawTree(root, 300, 100, 100);
    };

    req.send("Ok");
}

function getTraversals(){
    $("ul li").remove();
    let req = new XMLHttpRequest();
    req.open("GET", visualize_traversals, true); // true for asynchronous
    req.responseType = 'json';

    req.onload = function() {
        let trav = JSON.parse(JSON.stringify(req.response));

        for( let ind in trav){
            let x = document.createElement("li")
            x.className = "list-group-item";
            x.innerText = ind +": "+ trav[ind];
            $('#ul').append(x);
        }
    };

    req.send("Ok");
}

// level order traversal (
function deserializeTree(data){
    const root = new Tree(data.shift());
    const queue = [root];

    while (data.length > 0) {
        const node = queue.shift();

        // Left node
        let val = data.shift();
        if (typeof val !== 'undefined' && val !== null) {
            node.left = new Tree(val);
            queue.push(node.left);
        }

        // Right node
        val = data.shift();
        if (typeof val !== 'undefined' && val !== null) {
            node.right = new Tree(val);
            queue.push(node.right);
        }
    }

    return root;
}

//Tree class
class Tree {
    constructor(value, rt = null, lt = null) {
        this.val = value;
        this.right = rt;
        this.left = lt;
    }
}
function drawNode(x, y, r, text, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.font = "italic 20px Courier";
    ctx.strokeText(text, x - 10, y);
    ctx.stroke();
}

function drawLine(fromx, fromy, tox, toy, ctx) {
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.closePath();
    ctx.stroke();
}
function drawTree(rootTree, xstep, ystep, distance) {
//draw node
    if (rootTree !== null) {
        drawNode(xstep, ystep, 20, rootTree.val, ctx);
        //console.log(rootTree.val);
    }
//draw left tree
    if (rootTree.left !== null) {
        drawLine(xstep, ystep + 20, xstep - distance, ystep + 100 - 20, ctx);
        drawTree(rootTree.left, xstep - distance, ystep + 100, distance / 2 + 20);
    }
// draw right tree
    if (rootTree.right !== null) {
        drawLine(xstep, ystep + 20, xstep + distance, ystep + 100 - 20, ctx);
        drawTree(rootTree.right, xstep + distance, ystep + 100, distance / 2 + 20);
    }
}