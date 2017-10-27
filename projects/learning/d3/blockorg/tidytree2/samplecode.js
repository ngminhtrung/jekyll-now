var treeData =
    {
        "name": "VP",
        "children": [
            {
                "name": "VP",
                "children": [

                    { "name": "VP_OBJ",
                      "children": [
                          {"name": "VP",
                        "children": [
                            {"name": "NP_SBJ"},
                            {"name": "NP_SBJ"},
                            {"name": "NP_AJT"}
                        ]},
                          {"name": "NP_AJT"},
                          {"name": "NP_OBJ"}
                      ]},
                ]
            },
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
    
    
