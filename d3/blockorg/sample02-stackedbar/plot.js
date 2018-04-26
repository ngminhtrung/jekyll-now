// create a svg with margin, width, height
// apend a g element to svg, all other elements will belong to g 

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// create scale for x-axis. x-axis to represent different categories of data. 
// scaleBand not scaleOrdinal is set
var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.05)
    .align(0.1);

// create scale for y-axis 
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// read data
d3.csv("data.csv", function(d, i, columns) {
    // for each row of data.csv, do the code block below (including the for ...)
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        // the code above to calculte the total value of each row while go through each column of row 
    d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;
  
  // delete the 1st column
  var keys = data.columns.slice(1);

    // sort rows against total values of each row. 
  data.sort(function(a, b) { return b.total - a.total; });
  // set domain of x-axis upon number of states. 
  x.domain(data.map(function(d) { return d.State; }));
  // set domain of y-axis upon the max total row value
  y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
  // set domain for the legend-axis
  z.domain(keys);

  // 
  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data)) //keys method to determine which categories to be stacked
    // in this case, the parameter keys tells that the stacks are age groups
    .enter().append("g")
        // for each stack, add a g-element 
        .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
            .enter().append("rect")
                .attr("x", function(d) { return x(d.data.State); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width", x.bandwidth());

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Population");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
});