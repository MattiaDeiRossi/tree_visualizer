const url = "http://localhost:3000/visualizeGraph"
var G = new jsnx.Graph();

G.addWeightedEdgesFrom([[2,3, 10]]);

function getDataGraph(){
    //clear previus graph
    G.clear();
    var req = new XMLHttpRequest();
    req.open("GET", url, true); // true for asynchronous
    req.responseType = 'json';

    // TODO: add path between nodes
    req.onload = function() {
        json_graph = JSON.parse(JSON.stringify(req.response));
        console.log(json_graph);
        for(var key in json_graph){
            if (json_graph.hasOwnProperty(key)){
                var value = json_graph[key];
                G.addNode(value);
            }
        }
        draw();
    };

    req.send("");
}

function draw() {
    return jsnx.draw(G, {
        element: '#canvas',
        weighted: true,
        edgeStyle: {
            'stroke-width': 5
        },
        withLabels: true,
    });
}