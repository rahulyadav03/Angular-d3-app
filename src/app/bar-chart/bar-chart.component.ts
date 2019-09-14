import { Component, ElementRef, Input, OnChanges, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
  import { DataModel } from 'src/app/data/data.model';
  import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export default class BarChartComponent implements OnInit {

  @ViewChild('charts', {static: true})
  private horizontalChartContainer: ElementRef;
  
  @Input()
  data: DataModel[];

  margin = {top: 20, right: 20, bottom: 30, left: 40};

  constructor() {}

  ngOnInit(): void {
    this.createHorizontalChart();
  }

  private createHorizontalChart(): void {
    const horizontalElement = this.horizontalChartContainer.nativeElement;
    var data = {
      labels: [
        'Coca-Cola', 'Fanta', 'Sprite',
        'Cappy'
      ],
      series: [
        {
          label: 'v1',
          values: [4000, 700, 400, 500]
        },
        {
          label: 'v2',
          values: [2000, 900, 500, 500]
        },
        {
          label: 'max val',
          values: [3000, 800, 900, 500]
        },]
    };
    
    var chartWidth       = 1000,
        barHeight        = 35,
        groupHeight      = barHeight * data.series.length,
        gapBetweenGroups = 10,
        spaceForLabels   = 150,
        spaceForLegend   = 150;
    
    // Zip the series data together (first values, second values, etc.)
    var zippedData = [];
    var zippedDataN = [];
    for (var i=0; i<data.labels.length; i++) {
      for (var j=0; j<data.series.length; j++) {
        zippedData.push({"label": data.series[j].label, "values": data.series[j].values[i]});
        zippedDataN.push(data.series[j].values[i]);
      }
    }
    // Color scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
    
    var x = d3.scaleLinear()
        .domain([0, d3.max(zippedData, function(d){
          return d.values;
        })])
        .range([0, chartWidth]);
    
    var y = d3.scaleLinear()
        .range([chartHeight + gapBetweenGroups, 0]);

    var yAxis = d3.axisLeft(y);
    
    // Specify the chart area and dimensions
    var chart = d3.select(horizontalElement).append('svg')
        .attr("width", spaceForLabels + chartWidth + spaceForLegend)
        .attr("height", chartHeight);
    
    // Create bars
    var bar = chart.selectAll("g")
        .data(zippedDataN)
        .enter().append("g")
        .attr("transform", function(d, i) {
          return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
        });
    var colorScale_1 = d3.schemeCategory10;
    // Create rectangles of the correct width
    bar.append("rect")
        .attr("class", "bar")
        .attr("width", x)
        .attr("height", function(d, i) {
          return ((i % 3) == 0) ? barHeight - 1 : barHeight - 1;
        })
        .attr("stroke", "orange") 
        .style("fill", function(d){
          if(d < 2500){
            return "red";
          }else{
            return "green";
          }
        })
    
    // Add text label in bar
    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("fill", "red")
        .attr("dy", ".35em")
        .text(function(d) { return d; });
    
    // Draw labels
    bar.append("text")
        .attr("class", "label")
        .attr("x", function(d) { return - 10; })
        .attr("y", groupHeight / 2)
        .attr("dy", ".35em")
        .text(function(d,i) {
          if (i % data.series.length === 0)
            return data.labels[Math.floor(i/data.series.length)];
          else
            return ""});
    
    chart.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
          .call(yAxis);
    
    // Draw legend
    var legendRectSize = 18,
        legendSpacing  = 4;
    
    var legend = chart.selectAll('.legend')
        .data(data.series)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = -gapBetweenGroups/2;
            var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });
    
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', colorScale_1[2])
        .style('stroke', colorScale_1[2]);
    
    legend.append('text')
        .attr('class', 'legend')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) { return d.label; });

  }
  
}
