// SVG area and margin
var svgWidth = 960;
var svgHeight = 660;
var plotMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

//plot area
var plotWidth = svgWidth - plotMargin.left - plotMargin.right;
var plotHeight = svgHeight - plotMargin.top - plotMargin.bottom;

//Append svg to body 
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//bottom left part of chart
var chartGr = svg.append("g")
    .attr("transform", `translate(${plotMargin.left}, ${plotMargin.top})`);


//csv
d3.csv("assets/data/data.csv").then(function(censusData){


  // date format and cast the force value to a number
    censusData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    });    

    //X axis
    var xAxis = d3.scaleLinear()
        .domain([0,d3.max(censusData, data => data.poverty)])
        .range([0, plotWidth]);


    //Y axis
    var yAxis = d3.scaleLinear()
        .domain([0, d3.max(censusData, data => data.healthcare)])
        .range([plotHeight, 0]);

    // to pass scales as arguments

    var bottomAxis = d3.axisBottom(xAxis);
    var leftAxis = d3.axisLeft(yAxis);

    // line function that plot the x and y coord for our scales
    var drawLine = d3.line()
    .x(data => xAxis(data.poverty))
    .y(data => yAxis(data.healthcare));

    //add points with append
    chartGr.append("g")
        .selectAll("dot")
        .data(censusData)
        .enter()
        .append("circle")
            .attr("cx", function(d){ return xAxis(d.poverty);})
            .attr("cy", function(d){return yAxis(d.healthcare);})
            .attr("r", 7)
            .style("fill", "#69b3a2")

    //Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGr.append("g")
    .classed("axis", true)
    .call(leftAxis);

    //Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGr.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${plotHeight})`)
        .call(bottomAxis)

    //title
    svg.append("text")
    .attr("x", (plotWidth / 2))             
    .attr("yAxis", 0 - (plotMargin.top / 2))
    .attr("dy", "1em")
    .attr("class", "aText")
    .text("HEALTHCARE VS. POBERTY");

    //X legend
    svg.append("text")
    .attr("transform","translate(" + (plotWidth/2) + " ," + (plotHeight + plotMargin.top + 40) + ")")
    .attr("class", "aText")
    .text("Poverty %");


    //Y legend
    svg.append("text")
    .attr("transform","rotate (-90)")
    .attr("yAxis", 0 - plotMargin.left)
    .attr("x", 0 - (plotHeight / 2))
    .attr("dy", "1em")
    .attr("class", "aText")
    .text("Healthcare %"); 

    });