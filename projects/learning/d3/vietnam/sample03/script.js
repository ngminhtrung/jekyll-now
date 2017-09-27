
///////////////////////////////////////////////////////////////////////////
////////////// Initiate SVG and create hexagon centers ////////////////////
///////////////////////////////////////////////////////////////////////////

//svg sizes and margins
var margin = {
              top: 30,
              right: 20,
              bottom: 20,
              left: 50
            };

var width = 800;
var height = 400;

//The number of columns and rows of the heatmap
var MapColumns = 16,
    MapRows = 16;

//The maximum radius the hexagons can have to still fit the screen
var hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),
    height/((MapRows + 1/3) * 1.5)]);

//Set the new height and width of the SVG based on the max possible
width = MapColumns*hexRadius*Math.sqrt(3);
heigth = MapRows*1.5*hexRadius+0.5*hexRadius;

//Set the hexagon radius
var hexbin = d3.hexbin()
  .radius(hexRadius);

//Calculate the center positions of each hexagon	
var points = [];
var data = [];

for (var i = 0; i < MapRows; i++) {
    for (var j = 0; j < MapColumns; j++) {
          var point = {
            x: "",
            y: "",
            r: "",
            col: "",
            row: "",
            isFilled: "",
          };
          var a;
          var b = (3 * i) * hexRadius / 2;
          if (i % 2 == 0) {
              a = Math.sqrt(3) * j * hexRadius;
          } else {
              a = Math.sqrt(3) * (j-0.5) * hexRadius;
          }
          point.x = a;
          point.y = b;
          point.r = hexRadius;
          point.col = j;
          point.row = i;
          point.isFilled = false;
          data.push(point);
          points.push([a, b]);
        }
    }

//Create SVG element
var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function paintBlock(param) {
  var colors = ["#aeeedb", "#fdaf94", "#d2e475", "#c9b2e1","#dcb3d3"];
  return colors[param % colors.length];
}


///////////////////////////////////////////////////////////////////////////
////////////////////// Draw hexagons, fill the offset coordinate///////////
///////////////////////////////////////////////////////////////////////////

//Start drawing the hexagons
svg.append("g")
.selectAll(".hexagon")
.data(hexbin(points))
    .enter().append("path")
          .attr("class", "hexagon")
          .attr("d", function (d) {
              return "M" + d.x + "," + d.y + hexbin.hexagon();
          })
          .attr("stroke", function (d,i) {
              return "rgb(226, 226, 226)";
          })
          .style("fill", "red")
          .attr("stroke-width", "1px")
          .style("fill", "gray")


  // “even-r” horizontal layout
  svg.append("g")
          .selectAll(".hexagon-text")
          .data(data)
              .enter().append("text")
                    .attr("class", "hexagon-text")
                    .attr("x", function (d,i) {
                        return d.x - 9;
                      })
                    .attr("y", function (d,i) {
                      return d.y + 3;
                      })
                    .style("fill", "white")
                    .style("font-size","9px")
                    .text(function(d,i){
                      return  d.col + "," + d.row ;
                    });

// create a div id "controls" containing a button                   
var controls = d3.select("body")
                    .append("div")
                    .attr("id", "controls");

var step_btn = controls.append("button")
                    .html("Step in")
                    .attr("state", 0) 

// function runs everything user clicks on button                    
step_btn.on("click", function(){

    var newLocation = [];
    for (var i = 0; i<18 ; i++) {
      var temp = {
        x: "",
        y: "",
        col: "",
        row: "",
        color: "",
      };
      locateNeighbor(bee);
      temp.x = bee.x;
      temp.y = bee.y;
      temp.col = bee.col;
      temp.row = bee.row;
      temp.color = (function() {
        if (bee.totalStep % 18 === 0 ) {
          return "red";
        } else {
          return paintBlock(Math.floor((bee.totalStep-1)/18));
        }
      })();
      newLocation.push(temp);
    }

    svg.append("g")
        .selectAll("filled-blocks")
        .data(newLocation)
        .enter()
        .append("circle")
        .classed("filled-blocks", true)
            .attr("cx", function(d,i) {
              return d.x;})
            .attr("cy", function(d,i) {
              return d.y;})
            .attr("r", bee.r)
            .style("fill","white")
            .transition()
            .delay(function(d, i) { return i*100; })
            .style("fill", function(d,i) {
              return d.color;})
            .style("opacity", "0.8")
            
    
    $("#step-count").text(Math.floor(bee.totalStep /18));
    }
    
  // }

  
)

// set coordinate of the center point
var center = {
        x: data[convertColRow2i(MapColumns/2,MapRows/2)].x,
        y: data[convertColRow2i(MapColumns/2,MapRows/2)].y,
        r: data[convertColRow2i(MapColumns/2,MapRows/2)].r/2,
        col: MapColumns/2, //8
        row: MapRows/2 //6
      };

// mark the center point
svg.append("g")
      .append("circle")
      .attr("cx", center.x)
      .attr("cy", center.y)
      .attr("r", center.r)
      .style("fill", "red")
      .style("opacity", "0.3");

// set the point corresponding to center "Filled", bee will not move into this block
data[convertColRow2i(MapColumns/2,MapRows/2)].isFilled = true;

// set the inital data of BEE
var bee = {
      x: data[convertColRow2i(center.col + 1,center.row - 1)].x,
      y: data[convertColRow2i(center.col + 1,center.row - 1)].y,
      r: data[convertColRow2i(center.col + 1,center.row - 1)].r/2,
      col: center.col + 1,
      row: center.row - 1,
      totalStep: 1,
      previousDirection: 3 // important initial setting. 
};

// mark the BEE's initial point
svg.append("g")
    .append("circle")
    .attr("cx", bee.x)
    .attr("cy", bee.y)
    .attr("r", bee.r)
    .style("fill", "green")
    .style("opacity", "0.3");

// set the point corresponding to BEE's inital location "Filled", bee will not move into this block in next step
data[convertColRow2i(center.col + 1,center.row - 1)].isFilled = true;

// BEE to locate which neihbor block to move into
function locateNeighbor(currentPoint) {
  var neighbor = {
    col: currentPoint.col,
    row: currentPoint.row
  }

  // check if bee could go with new direction
  var direction = (currentPoint.previousDirection + 1) % 6;

  if (currentPoint.row % 2 == 0) {
    switch (direction) {
      case 0:
        neighbor.col += 1;
        break;
      case 1:
        neighbor.col += 1;
        neighbor.row -= 1;
        break;
      case 2:
        neighbor.row  -= 1;
        break;
      case 3:
        neighbor.col -= 1;
        break;
      case 4:
        neighbor.row += 1;
        break;
      case 5:
        neighbor.col  += 1;
        neighbor.row  += 1;
        break;
    }

  } else if (currentPoint.row %2 === 1) {

    switch (direction) {
      case 0:
      neighbor.col += 1;
        break;
      case 1:
      neighbor.row  -= 1;
        break;
      case 2:
      neighbor.col  -= 1;
      neighbor.row  -= 1;
        break;
      case 3:
      neighbor.col -= 1;
        break;
      case 4:
      neighbor.col  -= 1;
      neighbor.row  += 1;
        break;
      case 5:
      neighbor.row -= 1;
      neighbor.col += 1;
        break;
    }
  }

  var i = convertColRow2i(neighbor.col, neighbor.row);

  if (data[i].isFilled == false) {
    moveBee(direction);

  } else {
    moveBee(currentPoint.previousDirection);
  }
}


// update BEE upon new direction
function moveBee(direction) {

  if (bee.row % 2 == 0) {
    switch (direction) {
      case 0:
        bee.col += 1;
        break;
      case 1:
        bee.col += 1;
        bee.row -= 1;
        break;
      case 2:
        bee.row  -= 1;
        break;
      case 3:
        bee.col -= 1;
        break;
      case 4:
        bee.row += 1;
        break;
      case 5:
        bee.col  += 1;
        bee.row  += 1;
        break;
    }

  } else if (bee.row %2 === 1) {

    switch (direction) {
      case 0:
      bee.col += 1;
        break;
      case 1:
      bee.row  -= 1;
        break;
      case 2:
      bee.col  -= 1;
      bee.row  -= 1;
        break;
      case 3:
      bee.col -= 1;
        break;
      case 4:
      bee.col  -= 1;
      bee.row  += 1;
        break;
      case 5:
      bee.row += 1;
        break;
    }
  }

  var i = convertColRow2i(bee.col, bee.row);
  // update bee
  bee.x = data[i].x;
  bee.y = data[i].y;
  bee.r = data[i].r/2;
  bee.previousDirection = direction; // important initial setting
  bee.totalStep += 1;
  // update data
  data[i].isFilled = true;
}

function convertColRow2i(Col, Row) {
  return Col + Row * MapColumns;
}






