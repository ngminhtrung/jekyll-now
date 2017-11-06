// for D3 v4 ONLy


var treeData =
    {
        "name": "VP_01",
        "desc": "abc",
        "children": [
            {
                "name": "VP_02",
                "desc": "def",
                "arrow": "forward",
                "arrow_desc": "L2R01",
                "children": [
                    {
                        "name": "VP_OBJ_01",
                        "desc": "ghi",
                        "arrow": "forward",
                        "arrow_desc": "L2R02",
                        "children": [
                            {
                                "name": "VP_03",
                                "desc": "jkl",
                                "children": [
                                    {
                                        "name": "NP_SBJ_01",
                                        "desc": "mno"
                                    },
                                    {
                                        "name": "NP_SBJ_02",
                                        "desc": "pqr",
                                        "arrow": "forward",
                                        "arrow_desc": "L2R04",
                                        "children": [
                                            {
                                                "name": "NP_01",
                                                "desc": "stu",
                                                "children": [
                                                    {
                                                        "name": "NP_02",
                                                        "desc": "vwx",
                                                        "children": [
                                                            {
                                                                "name": "X_01",
                                                                "desc": "yza",
                                                                "children": [
                                                                    {
                                                                        "name": "NP_02",
                                                                        "desc": "bcd"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "NP_AJT_01",
                                        "desc": "efg",
                                        "arrow": "forward",
                                        "arrow_desc": "L2R05",
                                        "children": [
                                            {
                                                "name": "VNP_MOD_01",
                                                "desc": "hij",
                                            }]
                                    }
                                ]
                            },
                            {
                                "name": "NP_AJT_02",
                                "desc": "klm",
                                "children": [
                                    {
                                        "name": "VP_MOD_01",
                                        "desc": "nop",
                                        "arrow": "backward",
                                        "arrow_desc": "R2L01",
                                        "children": [
                                            {
                                                "name": "NP_AJT_03",
                                                "desc": "qrs",
                                                "arrow": "forward",
                                                "arrow_desc": "L2R06",
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "NP_OBJ_01",
                                "desc": "tuv",
                                "arrow": "forward",
                                "arrow_desc": "L2R03",
                            }
                        ]
                    },
                ]
            },
        ]
    };

// set the symbol shape according to d3 v4 symbol api
var shape = {
    "circle": d3.symbol().type(d3.symbolCircle),
    "cross": d3.symbol().type(d3.symbolCross),
    "diamond": d3.symbol().type(d3.symbolDiamond),
    "square": d3.symbol().type(d3.symbolSquare),
    "star": d3.symbol().type(d3.symbolStar),
    "triangle": d3.symbol().type(d3.symbolTriangle),
    "wye": d3.symbol().type(d3.symbolWye),
}

// set the options

var option = {
    size: {
        w: 700,
        h: 700
    },
    background: {
        color: "2B2B2B",
    },
    link: {
        color: "white",
        width: "2px",
        highlighted_width: "4px"
    },
    name: {
        color: "#6796DE",
        size: "12px"
    },
    symbol: {
        size: 200,
        color: "#6796DE",
        shape: shape.circle // circle, cross, diamond, square, star, triange, wye 
    },
    arrow: {
        size: "12px",
        color: "yellow"
    },
    highlighted_lines: [
        {
            nodes: ["VP_02", "VP_OBJ_01", "NP_OBJ_01", "NP_SBJ_02", "NP_AJT_01", "VP_MOD_01", "NP_AJT_03"],
            color: "green",
        },
        {
            nodes: [""],
            color: "",
        }]
}

// set the dimensions and margins of the diagram
var margin = { top: 50, right: 50, bottom: 50, left: 50 },
width = option.size.w - margin.left - margin.right,
height = option.size.h - margin.top - margin.bottom;

var chart = d3.select("#chart_box").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)

draw.call(chart, option)

function draw(option) {

    this.style("background-color", option.background.color);
    // declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([width, height]);

    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(treeData);
    data = nodes;
    console.log(data);

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    g = this.append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes

    var link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter()
        // .append("defs")
        .append("path")
        .attr("id", function (d) {
            return d.data.name;
        })
        .attr("d", function (d) {
            return "M" + d.x + "," + d.y
                + " " + d.parent.x + "," + d.parent.y;
        })
        .style("stroke", function (d) {
            var highlightedColor = "";
            var count = 0;
            option.highlighted_lines.forEach(function (element) {
                if (element.nodes.indexOf(d.data.name) !== -1) {
                    d.data.highlighted = true; // found nodes & line to be highlighted, increased count
                    d.data.highlightedColor = element.color;
                }
            })
            return (d.data.highlighted) ? d.data.highlightedColor : option.link.color;
        })
        .style("stroke-width", function (d) {
            return (d.data.highlighted) ? option.link.highlighted_width : option.link.width;
        })

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

    // add marking symbole

    node.append("path")
        .attr("class", "marking_symbol")
        .style("stroke", "2px")
        .style("fill", function (d) {
            return (d.data.highlighted) ? d.data.highlightedColor : option.symbol.color;
        })
        .attr("d", option.symbol.shape.size(option.symbol.size)
        )

    // adds NAME of nodes
    node.append("text")
        .attr("class", "name")
        .attr("dx", 0)
        .attr("dy", ".35em")
        .attr("y", function (d) { return - 20; })
        .style("text-anchor", "middle")
        .style("font-size", option.name.size)
        .style("fill", option.name.color)
        .text(function (d) { return d.data.name; });
    
    // adds DESCRIPTION of nodes
    node.append("text")
        .attr("class", "description")
        .attr("dx", -10)
        .attr("y", function (d) { return 20; })
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "white")
        .text(function (d) { return d.data.desc; });

    // add ARROW & its DESCRIPTION along the path
    node.append("text")
        .attr("class", "arrow")
        .style("text-anchor", "middle")
        .style("font-size", option.arrow.size)
        .style("fill", option.arrow.color)
        .attr("transform", function (d) {
            if (d.data.arrow_desc) {
                var translate = "translate(" + ((-d.x + d.parent.x) / 2 + 15) + "," + ((-d.y + d.parent.y) / 2) + ")";
                var rotate = "rotate(" + getAngleDeg(d.x, d.y, d.parent.x, d.parent.y) + ")";
                return translate + rotate;
            } else {
                return ""
            }
        })
        .text(function (d) {
            if (d.data.arrow === "forward") {
                if (d.x >= d.parent.x) {
                    return d.data.arrow_desc + " ⇨";
                } else {
                    return "⇦ " + d.data.arrow_desc;
                }
            }
            else if (d.data.arrow === "backward") {
                if (d.x >= d.parent.x) {

                    return "⇦ " + d.data.arrow_desc;

                } else {
                    return d.data.arrow_desc + " ⇨";
                }

            } else {
                return ""
            }
        });
}

/*
* Calculates the angle between AB and the X axis
* A and B are points (ax,ay) and (bx,by)
*/
function getAngleDeg(ax, ay, bx, by) {
    var angleRad = Math.atan((ay - by) / (ax - bx));
    var angleDeg = angleRad * 180 / Math.PI;

    return (angleDeg);
}
