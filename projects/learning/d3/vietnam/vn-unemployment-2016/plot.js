//age1 = 15-24, age2 = 25-49, age3 = 50+
var data = [
	{ "area": "Red River Delta", "age1": 9.62, "age2": 1.45, "age3":20 },
{ "area": "Northern midlands and moutain areas", "age1": 2.95, "age2": 20, "age3":20},
{ "area": "North Central and Central Coastal area", "age1": 8.26, "age2": 20, "age3":20},
{ "area": "Central Highlands", "age1": 2.47, "age2": 20, "age3":20 },
{ "area": "South East", "age1": 8.02, "age2": 20, "age3":20},
{ "area": "Mekong River Delta", "age1": 8.19, "age2": 20, "age3":20}];


var barWidth = 85;
var w = data.length * barWidth;
var h = 600;
var barHeight = 30;
var margin = {
	top: 100,
	bottom: 200,
	left: 100,
	right: 100
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;
var formatAsPercentage = d3.format(".1%");

var x = d3.scaleBand()
	.domain(data.map(function(entry){
		return entry.area;
	}))
	.range([0, width])
	.paddingInner(0.1);


var y = d3.scaleLinear()
	.domain([0, d3.max(data, function(d){
			return d.age1;
		})])
	.range([height, 0]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

var ordinalColorScale =  d3.scaleOrdinal(d3.schemeCategory10);

var yGridlines =  d3.axisLeft(y)
					.tickSize(-width,0,0)
					.tickFormat("");

var svg = d3.select("body").append("svg")
			.attr("id", "chart")
			.attr("width", w)
			.attr("height", h);

var chart = svg.append("g")
			.classed("display", true)
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var controls = d3.select("body")
					.append("div")
					.attr("id", "controls");
var sort_btn = controls.append("button")
					.html("Sort data: ascending")
					.attr("state", 0)
					

function drawAxis(params) {
	
	if (params.intialize === true) {
		// draw the gridlines and axes
		this.append("g")
			.call(params.gridlines)
			.classed("gridline", true)
			.attr("transform", "translate(0,0)");

		// this is x-axis
		this.append("g")
			.classed("x axis", true)
			.attr("transform", "translate(" + 0 + "," + ( height + 2) + ")")
			.call(params.axis.x)
			.selectAll("text")
					.classed("x-axis-label",true)
					.style("text-anchor", "start")
					.attr("dx", 8)
					.attr("dy", 10)
					.attr("transform", "rotate(45)")
					.style("font-size","12px")

		this.append("g")
			.classed("y axis", true)
			.attr("transform", "translate(-3,0)")
			.call(params.axis.y)

		//This is the y label
		this.select(".y.axis")
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left/2)
			.attr("x",0 - (height / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Unemployment Rate");    

		//This is the x label
		this.select(".x.axis")
			.append("text")
			.attr("x", 0)
			.attr("y", -h + 700)
			.style("text-anchor", "middle")
			.attr("transform", "translate(" + width/2 + ",80)")
			.text("Regions in Vietnam");

        //This is the bar-chart title
        this.append("text")
            .attr("x", width/2)
            .attr("y", -50)
            .style("text-anchor", "middle")
            .text(("Unemployment Rate in Vietnam - Data of 2015").toLocaleUpperCase());   

        this.append("text")
            .attr("x", width/2)
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Source: General Statistics Office Of Vietnam"); 
      

	} else if (params.intialize === false) {

		// update info
		this.selectAll("g.x.axis")
			.call(params.axis.x);
		this.selectAll(".x-axis-label")
			.style("text-anchor", "start")
			.attr("dx", 8)
			.attr("dy", 10)
			.attr("transform", "rotate(45)")

		this.selectAll("g.y.axis")
			.call(params.axis.y)

	}


}

function plot(params) {

	x.domain(data.map(function(entry){
			return entry.area;
		}));
	y.domain([0, d3.max(data, function(d){
			return d.age1;
		})]);

	drawAxis.call(this, params)

    // enter()
    
    

	this.selectAll(".bar")
		.data(data)
		.enter()
			.append("rect")
			.classed("bar", true)
			.on("mouseover", function(d,i){
				d3.select(this).style("fill", "gray");
			})
			.on("mousemove", function(d,i){

			})
			.on("mouseout", function(d,i){
				d3.select(this).style("fill", ordinalColorScale(i));
			});
			
			

	this.selectAll(".bar-label")
		.data(data)
		.enter()
			.append("text")
			.classed("bar-label", true);

	// update()
	this.selectAll(".bar")
            .transition()
            .duration(500)
            // .ease("bounce")
            // .delay(500)
            .attr("x", function(d,i) {
				return x(d.area) + 1;
			})
			.attr("y", function(d,i) {
				return y(d.age1);
			})
			.attr("height", function(d) {
				return height - y(d.age1);
			})
			.attr("width", function(d){
				return x.bandwidth();
			})
			.style("fill", function(d,i){
				return ordinalColorScale(i);
			});

    this.selectAll(".bar-label")
            .transition()
            .duration(500)
            // .ease("easeBounce")
            // .delay(500)
		    .attr("x", function(d,i) {
			return x(d.area) + x.bandwidth() + 10;
            })
            .attr("dx", -35 )
            .attr("y", function(d,i){ return y(d.age1);})
            .attr("dy", 18)
            .style("font-size","12px")
            .style("fill", "white")
            .text(function(d){
                return (d.age1) + "%";
            });
	
	// exit()

	this.selectAll(".bar")
		.data(params.data)
		.exit()
		.remove();
	
	this.selectAll(".bar-label")
		.data(params.data)
		.exit()
		.remove();

	

}

plot.call(chart, {
	data: data,
	axis: {
		x: xAxis,
		y: yAxis
	},
	gridlines: yGridlines,
	intialize: true
	});

sort_btn.on("click", function(){
	var self = d3.select(this);
	var ascending = function(a,b) {
		return a.age1 - b.age1;
	};
	var descending = function(a,b) {
		return b.age1 - a.age1;
	};
	var state = + self.attr("state");
	var txt = "Sort data: ";
	if (state === 0) {
		data.sort(ascending);
		state = 1;
		txt += "descending";

	} else if (state === 1) {
		state = 0;
		data.sort(descending);
		txt += "ascending";
	}
	self.attr("state", state);
	self.html(txt);
	plot.call(
			chart, {
		data: data,
		axis: {
			x: xAxis,
			y: yAxis
		},
		gridlines: yGridlines,
		intialize: false
		});


});
