// Graph:1 Healthcare Vs. Poverty
// set an axis

var xLabel = "poverty"
var yLabel = "healthcare"

//define SVG area dimension
var svgWidth = 960;
var svgHeight= 700;

// define chart margin as an object
var chartMargin ={top:30, right:30, bottom:50, left:50};

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

// print data on console
    console.log(healthData);

// cast each value in healthData and convert into number by using Unary operator
    healthData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty    = +data.poverty;
        data.smokes     = +data.smokes;
        data.age        = +data.age;
        data.obesity    = +data.obesity;
        data.income     = +data.income;
    });
})
    .catch(function(error) {            // to catch an error
        console.log(error);
    });




