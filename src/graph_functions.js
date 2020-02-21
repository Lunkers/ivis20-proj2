import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import * as d3Geo from 'd3-geo';
import worldData from './world.geojson'
import { series } from 'async';


export const create_scatter = (parent, data, xScale, yScale, xVar, yVar,  colorScale, series) => {
    let clicked = ""
    // Setup tooltips
    const tip = d3Tip()
        .attr("class", "d3-tooltip")
        .offset([0, 0])
        .html(d => d.country)
    parent.call(tip)
    const graph = parent
        .selectAll('circle')
        .data(data)
        .join(
            enter => enter.append('circle')
                .attr("stroke", "black")
                .attr("class", "plot-point")
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
        )
        .transition()
        .duration(2000)
        .attr('cx', d => xScale(d[xVar]))
        .attr('cy', d => yScale(d[yVar]))
        .style("display", d=> (d[xVar] === null || d[yVar] === null) ? 'none': null)
        .attr('r', 10)
        .attr('id', d => d.country)
        .attr('fill', d => colorScale(d.CulZon))
        .style('opacity', 1);

    // TODO: add legend with filtering

    // remove old axes
    parent.selectAll(".xaxis").remove();
    parent.selectAll(".yaxis").remove();
    parent.selectAll(".xlabel").remove();
    parent.selectAll(".ylabel").remove();
    //append axes
    parent.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + 625 + ")")
        .call(d3.axisBottom(xScale));

    parent.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(" + 75 + ",0)")
        .call(d3.axisLeft(yScale));

    parent.append("text")
    .style("fill", "white")
        .attr("class", "xlabel")
        .attr("text-anchor", "end")
        .attr("x", 600)
        .attr("y", 675)
        .text(() => {
            switch(xVar) {
                case "LifSat": {
                    console.log("LIFSAT")
                    return "Satisfaction with life"
                }
                case "WilFig": {
                    return "Willingness to fight for your country"
                }
                case "PerHea": {
                    return "Perceived Health"
                }
                case "SVI_short": {
                    return "Secular value index"
                }
            }
        });

        parent.append("text")
        .style("fill", "white")
            .attr("class", "ylabel")
            .attr("text-anchor", "start")
            .attr("transform", "rotate(270)")
            .attr("x", -625)
            .attr("y", 45)
            
            .text(() => {
                switch(yVar) {
                    case "Happy": {
                        console.log("LIFSAT")
                        return "Happiness"
                    }
                    case "StaTru": {
                        return "Trust in others"
                    }
                    case "FinSat": {
                        return "Financial Satisfaction"
                    }
                    case "IndEmp2": {
                        return "Individual Empowerment"
                    }
                }
            });

    //remove old legend
    parent.selectAll(".legend").remove();

    //setup legend
    const legend = parent.selectAll(".legend")
    .data(colorScale.domain())
    .join(
        enter => enter.append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => "translate(700," + (100 +(i * 25 )) + ")"),
        
    )

    legend.append("circle")
    .attr("r", 10)
    .style("stroke", "black")
    .style("fill", d => colorScale(d))
    .on('click', d => {
        d3.selectAll('.plot-point').style('opacity', 1)

        if(clicked !== d) {
            d3.selectAll('.plot-point').filter(e => e.CulZon !== d).style('opacity', 0.1)
            clicked = d 
        }
        else {
            clicked = d
        }
    })
    
    legend.append("text")
      .attr("x", 20)
      .attr("y", 0)
      .attr("dy", ".35em")
      .style("fill", "white")
      .style("text-anchor", "start")
      .text(d=> d );

    //remove old time series text
    parent.selectAll('.series').remove()

    //append time series text
    const seriesText = parent.append("text")
    .attr('class', 'series')
    .attr('x', 500)
    .attr('y', 600)
    .text(series)
    .style('fill', 'white')
    .style('opacity', 0.5)

}