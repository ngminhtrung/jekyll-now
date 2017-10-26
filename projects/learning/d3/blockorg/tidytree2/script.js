var treeData =
    {
        "name": "A",
        "children": [
            {
                "name": "B.1",
                "children": [

                    { "name": "B.1.1",
                      "children": [
                          {"name": "B.1.1.1"},
                          {"name": "B.1.1.2"}
                      ]},
                    { "name": "B.1.2" },
                    { "name": "B.1.3" },
                    { "name": "B.1.4" }
                ]
            },
            {
                "name": "C",
                "children": [
                    { "name": "C.1" }
                ]
            },
            {
                "name": "D",
                "children": [
                    { "name": "D.1" },
                    { "name": "D.2" }
                ]
            }
        ]
    };


// set the dimensions and margins of the diagram
var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 550 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var drawBtn = document.getElementById("draw");

var background_color = "#FFFFFF";
var link_color = "#008000";
var symbol_size = 10;


var chart = d3.select("#chart_box").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var option = {
    background_color: background_color,
    link_color: link_color,
    symbol_size: symbol_size
}

draw.call(chart, option)

drawBtn.addEventListener("click", function () {
    draw.call(chart, option)
})

function draw(params) {
    console.log("Symbol Size: " + params.symbol_size);
    // var strFontSize = '"' + params.font_size + 'px"';

    this.style("background-color", params.background_color);
    // declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([width, height]);

    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(treeData);
    // console.log(nodes);

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    g = this.append("g")
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
        })
        .style("stroke", params.link_color);

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
        .attr("r", params.symbol_size);

    // adds the text to the node
    node.append("text")
        .attr("dy", ".35em")
        .attr("y", function (d) { return d.children ? -20 : 20; })
        // .style("font-size", strFontSize )
        .style("text-anchor", "middle")
        .style("font-size", "12px")
       
        .text(function (d) { return d.data.name; });
    
    // console.log(strFontSize);
}

window.addEventListener("load", startup, false);

function startup() {

    // listen to input of Background Color
    colorPickerBackground = document.querySelector("#backgroundColor");
    colorPickerBackground.value = background_color;
    colorPickerBackground.addEventListener("input", updateFirstBackground, false);
    colorPickerBackground.addEventListener("change", updateBackground, false);
    colorPickerBackground.select();

    // listen to input of Line Color
    colorPickerLine = document.querySelector("#linkColor");
    colorPickerLine.value = link_color;
    colorPickerLine.addEventListener("input", updateFirstLineColor, false);
    colorPickerLine.addEventListener("change", updateLineColor, false);
    colorPickerLine.select();

    // listen to input of Symbol Size

    symbolSizePicker = document.querySelector("#symbolSize");
    symbolSizePicker.value = symbol_size;
    symbolSizePicker.addEventListener("input", updateFirstSymbolSize, false);
    symbolSizePicker.addEventListener("change", updateSymbolSize, false);
    symbolSizePicker.select();
}
function updateFirstBackground(event) {
    option.background_color = event.target.value;
}

function updateBackground(event) {
    option.background_color = event.target.value;
}

function updateFirstLineColor(event) {
    option.link_color = event.target.value;
}

function updateLineColor(event) {
    option.link_color = event.target.value;
}

// font size 

function updateFirstSymbolSize(event) {
    option.symbol_size = event.target.value;
}

function updateSymbolSize(event) {
    option.symbol_size = event.target.value;
}