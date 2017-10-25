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
    
var background_color = "#FFFFFF";
var link_color = "#008000";

var option = {
    background_color: background_color,
    link_color: link_color
}

var chart = d3.select("#chart_box").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

draw.call(chart, option)
    
    
