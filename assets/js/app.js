// Graph:1 Healthcare Vs. Poverty and Smokers vs. Age
//define a responsive function
function makeResponsive() {

    var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

// set an axis labels
var xPoverty = "poverty"
var yHealthcare = "healthcare"

//define SVG area dimension
var svgWidth = 960;
var svgHeight= 600;

// define chart margin as an object
var chartMargin ={top:30, right:100, bottom:100, left:90};

// define dimesion of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// select body and append to SVG 
var svg = d3.select("#scatter")
    .append("svg")
    .attr ("width", svgWidth)
    .attr ("height", svgHeight)
    .attr("fill", "white");

//append a group to the svg area
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load csv data by using data.csv file

d3.csv("assets/data/data.csv").then(function(data) {

    var healthData = data;
    console.log(healthData);

// cast each value in healthData and string to convert into number by using Unary operator
    healthData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty    = +data.poverty;
        data.smokes     = +data.smokes;
        data.age        = +data.age;
    });

// make a scale variable to set up scaleLinear function
    var xScale= d3.scaleLinear()
    .range([0, chartWidth])
    .domain([d3.min(healthData, data => data[xPoverty]) - 2, d3.max(healthData, data => data[xPoverty]) + 2]);

    var yScale= d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([d3.min(healthData, data => data[yHealthcare]) - 2, d3.max(healthData, data => data[yHealthcare]) + 2]);

//create x and y axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

//set x to the bottom of the chart
    var xBottom = chartGroup.append("g")
    .attr("transform",`translate(0, ${chartHeight})`)
    .call(xAxis);

//set y to the left of the chart
    var yLeft = chartGroup.append("g")
    .call(yAxis);

//configure a band scale for the xaxis
    var newGroup = chartGroup.selectAll("g circle")
        .data(healthData).enter()
        .append("g")

    var newCir = newGroup.append("circle")
        .attr("cx", d => xScale(d[xPoverty]))
        .attr("cy", d => yScale(d[yHealthcare]))
        .attr("r", 16)
        .classed("stateCircle", true);

    var newLabel = newGroup.append("text")
        .text (d => d.abbr)
        .attr("dx", d => xScale(d[xPoverty])-10)
        .attr("dy", d => yScale(d[yHealthcare])+5)
        .classed("stAbbr", true);

// group for xaxis labels
    var xaxisLabel = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight})`);

    var povLabel = xaxisLabel.append("text")
    .attr("x", 0)
    .attr("y", 35)
    .attr("value", "poverty") 
    .text("In Poverty (%)")
    .classed("active", true);

    var ageLabel = xaxisLabel.append("text")
    .attr("x", 0)
    .attr("y", 55)
    .attr("value", "age") 
    .text("Age (Median)")
    .classed("inactive", true);

// group for yaxis labels
    var yaxisLabel = chartGroup.append("g");

    var healthLabel = yaxisLabel.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(chartHeight / 2))
    .attr("y", -35)
    .attr("value", "healthcare") 
    .text("Lacks Healthcare (%)")
    .classed("active", true);

    var smokesLabel = yaxisLabel.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(chartHeight / 2))
    .attr("y", -55)
    .attr("value", "smokes") 
    .text("Smokes (%)")
    .classed("inactive", true);

})
}
makeResponsive();
//event listerner for window resize
d3.select(window).on("resize", makeResponsive);
