const svg = d3.select(".export-illustration").select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");
const chartTreemap = svg.append("g")
    .attr("class", "treemap");

const fader = function (color) { return d3.interpolateRgb(color, "#fff")(0.2); };
const color = d3.scaleOrdinal(d3.schemeCategory20.map(fader));
const format = d3.format(",d");

const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleLinear().range([0, height]);
const labelStyle = {
    "font-size": "14px",
    "fill": "black",
    "font-weight": "normal",
    "fill-opacity": "1"
};

let node;

function zoom(d) {
    const _w = d.x1 - d.x0;
    const _h = d.y1 - d.y0;
    const kx = width * 1.0 / _w;
    const ky = height * 1.0 / _h;

    x.domain([d.x0, d.x0 + _w]);
    y.domain([d.y0, d.y0 + _h]);

    const t = chartTreemap
        .selectAll("g.cell").transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", d => `translate(${x(d.x0)},${y(d.y0)})`);

    t.select("rect")
        .attr("width", d => kx * (d.x1 - d.x0))
        .attr("height", d => ky * (d.y1 - d.y0));

    t.select("text")
        .attr("x", d => kx * (d.x1 - d.x0) / 2)
        .attr("y", d => ky * (d.y1 - d.y0) / 2)
        .style("opacity", d => (kx * (d.x1 - d.x0) > d.w ? "1" : "0"));

    node = d;
    d3.event.stopPropagation();
}

const treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingInner(1);

d3.json("finalData.json", function (error, data) {
    if (error) throw error;

    const root = d3.hierarchy(data)
        .eachBefore(d => {
            d.data.id = (d.parent ? `${d.parent.data.id}.` : "") + (d.data.name ? d.data.name : "");
        })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    node = root;

    treemap(root);

    const cell = chartTreemap
        .selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("class", "cell")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .on("click", d => zoom(node === d.parent ? root : d.parent));

    cell.append("rect")
        .attr("id", d => d.data.id)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.parent.data.id));

    cell.append("text")
        .attr("x", d => (d.x1 - d.x0) * 0.5)
        .attr("y", d => (d.y1 - d.y0) * 0.5)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => { return d.data.description; })
        .text(function (d) {
            d.w = this.getComputedTextLength();
            const originalText = d.data.description;
            var shortenedText = originalText.replace(/ .*/,'').replace(/\,/, '');
            return (d.x1 - d.x0) > d.w ? originalText : shortenedText;
        })
        .style("opacity", function (d) {
            d.w = this.getComputedTextLength();
            return (d.x1 - d.x0) > d.w ? "1" : "0";
        })
        .style("font-size", labelStyle["font-size"])
        .style("font-weight", labelStyle["font-weight"])
        .style("fill", labelStyle.fill)

})


const notEmpty = o => !isEmpty(o);
