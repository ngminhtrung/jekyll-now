drawGeneralCharts(".chart_01_export", "export_data.csv");
drawGeneralCharts(".chart_02_import", "import_data.csv");
drawGeneralCharts(".chart_03_gpdcapita", "gdp_data.csv");

function drawGeneralCharts(selector, dataName) {
    const svg = d3.select(selector).select("svg");
    const margin = { top: 15, right: 15, bottom: 15, left: 15 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const parseTime = d3.timeParse("%Y");

    const x = d3.scaleTime()
        .rangeRound([0, width]);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.value));

    d3.csv(dataName, function (d) {
        console.log(d);
        d.year = parseTime(d.year);
        d.value = +d.value;
        return d;
    }, function (error, data) {
        if (error) throw error;

        x.domain(d3.extent(data, d => d.year));
        y.domain(d3.extent(data, d => d.value));

        console.log(y.domain());

        g.append("text")
            .attr("class", "x-axis-label-2007")
            .attr("x", x(data[0].year) - margin.left / 2)
            .attr("y", height + margin.bottom)
            .text("2007")
            .attr("fill", "lightgrey")
            .attr("font-style", "bold")

        const dataLength = data.length;

        g.append("text")
            .attr("class", "x-axis-label-2016")
            .attr("x", x(data[dataLength - 1].year) - margin.left)
            .attr("y", height + margin.bottom)
            .text("2016")
            .attr("fill", "lightgrey")
            .attr("font-style", "bold")

        const path = g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "lightgrey")
            .attr("stroke-width", "4px")
            .attr("d", line);

        let totalPathLength = path.node().getTotalLength();

        path
            .style("stroke-dasharray", `${totalPathLength} ${totalPathLength}`) // nhân đôi path, 1 visible, 1 invisible
            .style("stroke-dashoffset", totalPathLength) // dịch toàn bộ path sang bên trái 1 khoảng bằng độ dài path
            .transition()
            .duration(5000)
            .ease(d3.easeLinear) // đặt transition chạy trong 3000ms
            .style("stroke-dashoffset", 0); 
            // mỗi lần chạy transition là khoảng offset lại giảm đi một chút, 
            // giảm về đến 0, tạo cảm giác đường thẳng đang chạy

    })

}

