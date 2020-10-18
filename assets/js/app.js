
//Dimension for SVG
var width = 960;
var height= 700;

// define margin for the chart
var margin ={top:10, right:30, bottom:100, left:100};

// Dimension of chart area
var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top -margin.bottom;

// select body and append to SVG 
var svg = d3.select("#scatter")
    .append("svg")
    .attr ("width", chartWidth)
    .attr ("height", chartHeight)
    .attr("fill", "white");



// // circles
// var circles = svg.selectAll("s circle")
//     .data(stateName)
//     .enter()
//     .append("s")
