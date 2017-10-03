var w = 900;
var h = 600;

margin = {top: 120, right: 100, bottom: 250, left: 100},
width = w - margin.left - margin.right,
height = h - margin.top - margin.bottom,

// set scale for (super) Groups
x0 = d3.scaleBand()
        .rangeRound([0, width]) // tương tự như range, nhưng sẽ trả về nearest integer 
        .paddingInner(0.1); // determines the ratio of the range that is reserved for blank space between bands

// set scale for sub-groups
var x1 = d3.scaleBand()
            .padding(0.05);

var y = d3.scaleLinear()
            .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
            .range(["#a05d56", "#d0743c", "#ff8c00"]);


var svg = d3.select("body").append("svg")
            .attr("id", "chart")
            .attr("width", w)
            .attr("height", h);

var chart = svg.append("g")
			.classed("display", true)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);

var tool_tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-8, 0])
            .html(function(d,i) { return "Unemployment rate: <span style='color:red'>" + d.value + "%</span>"; });
svg.call(tool_tip);
          

d3.csv("data.csv", function(d, i, columns) {

// If a row conversion function is specified, the specified function
// is invoked for each row, being passed an object representing the current row (d),
// the index (i) starting at zero for the first non-header row, and the array of 
// column names.

// d is the whole object representing each row
// i -  is its index of that object and
// columns is the header row.

// bản thân d3.csv ngay từ đầu đã giúp loop qua từng row của file .csv
// trong mỗi loop, đoạn code bên trong sẽ được thực hiện, cụ thể ở đây
// chính là các vòng lặp for.
// File CSV có 7 rows --> toàn bộ for bên dưới sẽ được lặp 7 lần
// Trong mỗi vòng for, dự liệu sẽ được quét từ cột 1 (tính từ cột 0) cho đến cột cuối cùng
// Lưu ý: d ở đây là ọbect và chỉ lưu dữ liệu của từng row
// 

    for (var i = 1, n = columns.length; i < n; ++i) {
            d[columns[i]] = +d[columns[i]];
        }
        return d;
    }, function(error, data) {
        
        if (error) throw error;

        // columns is a property in the data array
        // data.columns will return all headers of the data 
        // data.columns.slice(1) will return all headers except the 1st one
        // ["Unemployment rate 15-24", "Unemployment rate 25-49", "Unemployment rate 50+"]
        
        var keys = data.columns.slice(1);
        
        // x0 gets domain of an array containings all States of original csv file
        x0.domain(data.map(function(d) { return d.Region; })); 
        
        // x1 gets domain starting from 0, ending at x0.bandwidth(), rounded to nearest integer number
        x1.domain(keys)
            .rangeRound([0, x0.bandwidth()]);
        
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        chart.selectAll(".categories")
		    .data(data)
		    .enter()
			.append("g")
			.classed("categories", true)
            // transform this "g" to x = x0(d.State)
                .attr("transform", function(d) { return "translate(" + x0(d.Region) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
                // join data through columns [starting from column 1]
                .enter().append("rect")
                    .classed("sub-categories", true)
                    .on("mouseover", function(d,i){
                        d3.select(this).style("fill", "purple");
                        div.transition()		
                            .duration(500)		
                            .style("opacity", .9);	})	
                    .on("mouseover",tool_tip.show)
                    .on("mouseout", tool_tip.hide)
                    .attr("x", function(d) { return x1(d.key); })
                    .attr("y", function(d) { return y(d.value); })
                    .attr("width", x1.bandwidth())
                    .attr("height", function(d) { return height - y(d.value); })
                    .attr("fill", function(d) { return z(d.key); });

        chart.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0))
            .selectAll("text")
                .classed("x-axis-label",true)
                .style("text-anchor", "start")
                .attr("dx", 8)
                .attr("dy", 10)
                .attr("transform", "rotate(45)")
                .style("font-size","12px")

          // create y-axis title 
          chart.append("g")
            .attr("class", "x-axis-title")
            .append("text")
                .attr("x", 300)
                .attr("y", 450)
                .attr("fill", "")
                .style("text-anchor", "start")
                .text("Regions of Vietnam")

        // create y-axis         
        chart.append("g")
            .attr("class", " y axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
                .attr("x", 3)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "middle")
        
        // create y-axis title 
        chart.append("g")
            .attr("class", "y-axis-title")
            .append("text")
                .attr("x", -50)
                .attr("y", 200)
                .attr("transform", "rotate(-90, -50, 200)")
                .attr("fill", "")
                .style("text-anchor", "start")
                .text("Unemployment Rate (%)")
                
        // create legend - top right corner         
        var legend = chart.append("g")
            .attr("class", "legend")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + - (i * 20) + ")"; });

        legend.append("rect")
            .attr("x", width)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });


        //This is the chart title
        chart.append("text")
            .classed("title", true)
            .attr("x", width/2)
            .attr("y", -70)
            .style("text-anchor", "middle")
            .text(("Unemployment Rate in Vietnam - Data of 2015").toLocaleUpperCase());

        chart.append("text")
            .attr("x", width/2)
            .attr("y", -45)
            .style("text-anchor", "middle")
            .text("Source: General Statistics Office Of Vietnam");
});
