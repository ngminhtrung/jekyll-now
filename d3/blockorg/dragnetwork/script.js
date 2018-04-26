var width = 960,
    height = 500;

var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-100))
    // alphaDecay controls how quickly the simulation cools
    // To have the simulation run forever at the current alpha, 
    // set the decay rate to zero; alternatively, 
    // set a target alpha greater than the minimum alpha.
    .alphaDecay(0);
    

d3.forceX(width)
d3.forceY(height)

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var drag = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
var link = svg.selectAll(".link")
var node = svg.selectAll(".node")

d3.json("graph.json", function (error, graph) {
    if (error) throw error;

    simulation.nodes(graph.nodes)
            .force("link", d3.forceLink(graph.links))
            .on("tick", tick);

    link = link.data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    node = node.data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 12)
        .on("dblclick", dblclick)
        .call(drag)

});

var count = 0;

function tick() {
    count++;
    console.log(count);
    link.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    node.attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
}

function dblclick(d) {
    d.fx = null;
    d.fy = null;
}


function dragstarted(d) {
    d3.select(this).classed("fixed", d.fixed = true);
    console.log("Is dragging");
}

function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

