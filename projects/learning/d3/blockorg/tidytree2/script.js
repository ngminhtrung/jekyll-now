var treeData =
    {
        "name": "Unilever",
        "children": [
            {
                "name": "Food",
                "children": [

                    { "name": "Lipton" },
                    { "name": "Becel" },
                    { "name": "Heartbrand" },
                    { "name": "Hellmann's" }
                ]
            },
            {
                "name": "Beverage",
                "children": [
                    { "name": "Lipton" }
                ]
            },
            {
                "name": "Cleaning Agents",
                "children": [
                    { "name": "Omo" },
                    { "name": "Lux" }
                ]
            },
            {
                "name": "Personal Care Products",
                "children": [
                    { "name": "Lynx" },
                ]
            },
        ]
    };

// set the dimensions and margins of the diagram
var margin = { top: 40, right: 90, bottom: 50, left: 90 },
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// declares a tree layout and assigns the size
var treemap = d3.tree()
    .size([width, height]);

//  assigns the data to a hierarchy using parent-child relationships
var nodes = d3.hierarchy(treeData);
console.log(nodes);

// maps the node data to the tree layout
nodes = treemap(nodes);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom),
    g = svg.append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// adds the links between the nodes
// reference: Bezier curve: https://www.w3schools.com/graphics/svg_path.asp
// bỏ qua level 0 mà đi bắt đầu từ level 1, do có slice(1)
var link = g.selectAll(".link")
    .data(nodes.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", function (d) {
        return "M" + d.x + "," + d.y
            + "C" + d.x + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
            + " " + d.parent.x + "," + d.parent.y;
    });

// adds each node as a group
var node = g.selectAll(".node")
    .data(nodes.descendants())
    .enter().append("g")
    .attr("class", function (d) {
        return "node" +
            (d.children ? " node--internal" : " node--leaf");
    })
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

// adds the circle to the node
node.append("circle")
    .attr("r", 10);

// adds the text to the node
node.append("text")
    .attr("dy", ".35em")
    .attr("y", function (d) { return d.children ? -20 : 20; })
    .style("text-anchor", "middle")
    .text(function (d) { return d.data.name; });
