var treeData = [
    {
        "name": "VP_01",
        "parent": "null",
        "desc": "abc",
        "children": [
            {
                "name": "VP_02",
                "parent": "VP_01",
                "desc": "def",
                "arrow": "forward",
                "arrow_desc": "L2R01",
                "children": [
                    {
                        "name": "VP_OBJ_01",
                        "parent": "VP_02",
                        "desc": "ghi",
                        "arrow": "forward",
                        "arrow_desc": "L2R02",
                        "children": [
                            {
                                "name": "VP_03",
                                "parent": "VP_OBJ_01",
                                "desc": "jkl",
                                "children": [
                                    {
                                        "name": "NP_SBJ_01",
                                        "parent": "VP_03",
                                        "desc": "mno"
                                    },
                                    {
                                        "name": "NP_SBJ_02",
                                        "parent": "VP_03",
                                        "desc": "pqr",
                                        "arrow": "forward",
                                        "arrow_desc": "L2R04",
                                        "children": [
                                            {
                                                "name": "NP_01",
                                                "parent": "NP_SBJ_02",
                                                "desc": "stu",
                                                "children": [
                                                    {
                                                        "name": "NP_SBJ_02",
                                                        "parent": "NP_01",
                                                        "desc": "vwx",
                                                        "children": [
                                                            {
                                                                "name": "X_01",
                                                                "parent": "NP_SBJ_02",
                                                                "desc": "yza",
                                                                "children": [
                                                                    {
                                                                        "name": "NP_02",
                                                                        "parent": "X_01",
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
                                        "parent": "VP_03",
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
                                "parent": "VP_OBJ_01",
                                "desc": "klm",
                                "children": [
                                    {
                                        "name": "VP_MOD_01",
                                        "parent": "NP_AJT_02",
                                        "desc": "nop",
                                        "arrow": "backward",
                                        "arrow_desc": "R2L01",
                                        "children": [
                                            {
                                                "name": "NP_AJT_03",
                                                "parent": "VP_MOD_01",
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
                                "parent": "VP_OBJ_01",
                                "desc": "tuv",
                                "arrow": "forward",
                                "arrow_desc": "L2R03",
                            }
                        ]
                    },
                ]
            },
        ]
    }];

// set the options
var option = {
    size: {
        w: 900,
        h: 900
    },
    background: {
        color: "2B2B2B",
    },
    link: {
        color: "#717983",
        width: "3px",
        highlighted_width: "4px"
    },
    name: {
        color: "#6796DE",
        size: "16px"
    },
    description: {
        color: "white",
        size: "14px"
    },
    symbol: {
        size: 200,
        color: "yellow",
        shape: "circle",
        // cirlce, cross, diamond, square, star, triangle-up, triangle-down, wye 
    },
    arrow: {
        size: "16px",
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
    .style("background-color", option.background.color)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var treemap = d3.layout.tree()
    .size([width, height]);

root = treeData[0];

draw.call(chart, option)

function draw(option) {


    // declares a tree layout and assigns the size

    var nodes = treemap.nodes(root);
    var links = treemap.links(nodes); // 

    console.log(nodes);
    console.log(links);


    var link = chart.selectAll("path.link")
        .data(links);

    link.enter()
        .append("path")
        .attr("d", function (d) {
            return "M" + d.source.x + "," + d.source.y
                + " " + d.target.x + "," + d.target.y;
        })
        .style("stroke", function (d) {
            var highlightedColor = "";
            var count = 0;
            option.highlighted_lines.forEach(function (element) {
                if (element.nodes.indexOf(d.source.children[0].name) !== -1) {
                    d.highlighted = true; // found nodes & line to be highlighted, increased count
                    d.highlightedColor = element.color;
                }
            })
            return (d.highlighted) ? d.highlightedColor : option.link.color;
        })
        .style("stroke-width", function (d) {
            return (d.highlighted) ? option.link.highlighted_width : option.link.width;
        })



    // Declare the nodes…
    var node = this.selectAll("g.node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("text")
        .attr("class", "name")
        .attr("dx", 0)
        .attr("dy", ".35em")
        .attr("y", function (d) { return - 20; })
        .style("text-anchor", "middle")
        .style("font-size", option.name.size)
        .style("fill", option.name.color)
        .text(function (d) { return d.name; });

    // adds DESCRIPTION of nodes
    node.append("text")
        .attr("class", "description")
        .attr("dx", -10)
        .attr("y", function (d) { return 20; })
        .style("text-anchor", "middle")
        .style("font-size", option.description.size)
        .style("fill", option.description.color)
        .text(function (d) { return d.desc; });


    // add ARROW & its DESCRIPTION along the path
    node.append("text")
        .attr("class", "arrow")
        .style("text-anchor", "middle")
        .style("font-size", option.arrow.size)
        .style("fill", option.arrow.color)
        .attr("transform", function (d) {
            if (d.arrow_desc) {
                var translate = "translate(" + ((-d.x + d.parent.x) / 2 + 15) + "," + ((-d.y + d.parent.y) / 2) + ")";
                var rotate = "rotate(" + getAngleDeg(d.x, d.y, d.parent.x, d.parent.y) + ")";
                return translate + rotate;
            } else {
                return ""
            }
        })
        .text(function (d) {
            if (d.arrow === "forward") {
                if (d.x >= d.parent.x) {
                    return d.arrow_desc + " ⇨";
                } else {
                    return "⇦ " + d.arrow_desc;
                }
            }
            else if (d.arrow === "backward") {
                if (d.x >= d.parent.x) {

                    return "⇦ " + d.arrow_desc;

                } else {
                    return d.arrow_desc + " ⇨";
                }

            } else {
                return ""
            }
        });

    node.append("path")
        .attr("class", "marking_symbol")
        .style("stroke", "2px")
        .style("fill", function (d) {
            option.highlighted_lines.forEach(function (element) {
                if (element.nodes.indexOf(d.name) !== -1) {
                    d.nodeHighlighted = true; // found node to be highlighted
                    d.nodeHighlightedColor = element.color;
                }
            })
            return (d.nodeHighlighted) ? d.nodeHighlightedColor : option.symbol.color;
        })
        .attr("d", d3.svg.symbol().type(option.symbol.shape).size(option.symbol.size));

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
