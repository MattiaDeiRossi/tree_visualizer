const url = "http://localhost:3000/visualizeGraph"
var G = new jsnx.Graph();

function getDataGraph(){
    //clear previus graph
    G.clear();
    let req = new XMLHttpRequest();
    req.open("GET", url, true); // true for asynchronous
    req.responseType = 'json';

    // TODO: add path between nodes
    req.onload = function() {
        json_graph = JSON.parse(JSON.stringify(req.response));
        console.log(json_graph)
        G.addNodesFrom(json_graph);

        //deserialize
        //from_json_array(json_graph, G, 0);
        /*for(var key in json_graph){
            if (json_graph.hasOwnProperty(key)){
                var value = json_graph[key];
                G.addNode(value);
            }
        }*/
        draw();
    };

    req.send("Ok");
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

function from_json_array(json, G, i){
    if (json[i]) {
        from_json_array(json, G, i+1);
        console.log(json[i]);
        from_json_array(json, G, i+1);
    }
}