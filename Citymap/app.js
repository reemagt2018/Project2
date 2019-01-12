var data = [
            {"param":"Mobile_Network","rank":23,"rank1":"Rank=23;" ,"details1" :"M-Population=4515419;","details2": "Score=97.2;"},
            {"param":"Business_Friendlines","rank":10 , "rank1":"Rank=10;" ,"details1" :" Ease=4;", "details2": "TaxRegulations=3;","details3":"HealthSafety=3;","details4":"Hiring=23;"},
            {"param":"Diversity","rank":93,"rank1":"Rank=93;" ,"details1" :"SocioEcoDivrank=96;","details2": "ReligiousDiversity=15;"},
            {"param":"Education","rank":23,"rank1":"Rank=23;" ,"details1" :"AttainmentGap=7;"  ,"details2": "EducationScore=58.77"},
            {"param":"Population","rank":34, "rank1":"Rank=34;" ,"details1" :"Population=486290;"},
            {"param":"Transit","rank":21,"rank1":"Rank=21;" ,"details1" :"T-Population=446271;"},
            {"param":"Overall","rank":13,"rank1":"Rank=13;" , "details1" :""}]

var margin = {top:20, right:30, bottom:80, left:50};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .03)
var yScale = d3.scale.linear()
      .range([height-30, 0])
      ;
var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

var svgContainer = d3.select("#chartID").append("svg")
		.attr("width", width+margin.left + margin.right)
		.attr("height",height+margin.top + margin.bottom)
		.append("g").attr("class", "container")
		.attr("transform", "translate("+ margin.left +","+ margin.top +")");

xScale.domain(data.map(function(d) { return d.param; }));
yScale.domain([0, d3.max(data, function(d) { return d.rank; })]);
num1= d3.max(data, function(d) { return d.rank; });

//xAxis. To put on the top, swap "(height)" with "-5" in the translate() statement. Then you'll have to change the margins above and the x,y attributes in the svgContainer.select('.x.axis') statement inside resize() below.
var xAxis_g = svgContainer.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height) + ")")
		.call(xAxis)
		.selectAll("text");

// // Uncomment this block if you want the y axis
// var yAxis_g = svgContainer.append("g")
// 		.attr("class", "y axis")
// 		.call(yAxis)
// 		.append("text")
// 		.attr("transform", "rotate(-90)")
// 		.attr("y", 6).attr("dy", ".71em")
// 		.style("text-anchor", "end").text("Ranking");



	svgContainer.selectAll(".bar")
  		.data(data)
  		.enter()
  		.append("rect")
  		.attr("class", "bar")
  		.attr("x", function(d) { return xScale(d.param); })
  		.attr("width", xScale.rangeBand())
  		.attr("y", function(d) { return yScale(num1-d.rank); })
  		.attr("height", function(d) { return height - yScale(num1-d.rank); });


//Adding the  labels to the top of each bar
      // Controls the text labels at the top of each bar. Partially repeated in the resize() function below for responsiveness.
      	svgContainer.selectAll(".text")
      	  .data(data)
      	  .enter()
      	  .append("text")
      	  .attr("class","label")
      	  .attr("x", (function(d) { return xScale(d.param) + xScale.rangeBand() / 2 ; }  ))
      	  //.attr("y", function(d) { return height - yScale(num1-d.rank); })
          // .attr("dy", 20)

          // .attr("y", function(d) { return yScale(num1-d.rank); })

      	  //.attr("dy", ".75em")
          .style("fill", "black")
      	  //.text(function(d) { return d.rank +"\n"+ d.details ; })
          .text(function(d) { return d.rank1  ;})
            .append("tspan")
            // .attr('x', (function(d) { return xScale(d.param) + xScale.rangeBand() / 2 ; }  ))
            // .attr("y", function(d) { return yScale(num1-d.rank) ; })
            //.attr("dy", "1.75em")
            .text(function(d) { return "      "  ;})
            .append("tspan")
            .text(function(d) { return d.details1 ;})
            .append("tspan")
            .text(function(d) { return d.details2 ;})
            .append("tspan")
            .text(function(d) { return d.details3 ;})
            .append("tspan")
            .text(function(d) { return d.details4 ;})

        ;


          document.addEventListener("DOMContentLoaded", resize);
        d3.select(window).on('resize', resize);
//Responsiveness
        function resize() {
        	console.log('----resize function----');
          // update width
          width = parseInt(d3.select('#chartID').style('width'), 10);
          width = width - margin.left - margin.right;

          height = parseInt(d3.select("#chartID").style("height"));
          height = height - margin.top - margin.bottom;
        	console.log('----resiz width----'+width);
        	console.log('----resiz height----'+height);
          // resize the chart

            xScale.range([0, width]);
            xScale.rangeRoundBands([0, width], .03);
            yScale.range([height, 0]);

            yAxis.ticks(Math.max(height/50, 2));
            xAxis.ticks(Math.max(width/50, 2));

            d3.select(svgContainer.node().parentNode)
                .style('width', (width + margin.left + margin.right) + 'px');

            svgContainer.selectAll('.bar')
            	.attr("x", function(d) { return xScale(d.param); })
              .attr("width", xScale.rangeBand());

           svgContainer.selectAll("text")
        	 // .attr("x", function(d) { return xScale(d.food); })
        	 .attr("x", (function(d) { return xScale(d.param	) + xScale.rangeBand() / 2 ; }  ))
              .attr("y", function(d) {  return yScale(num1-d.rank); })
              .attr("dy", "-30px");


            svgContainer.select('.x.axis').call(xAxis.orient('bottom')).selectAll("text").attr("y",10).call(wrap, xScale.rangeBand());
            // Swap the version below for the one above to disable rotating the titles
            // svgContainer.select('.x.axis').call(xAxis.orient('top')).selectAll("text").attr("x",55).attr("y",-25);


        }

//Wrapping text labels
        function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
