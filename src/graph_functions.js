import * as d3 from 'd3'
import d3Tip from 'd3-tip'
import * as d3Geo from 'd3-geo';
import worldData from './world.geojson'


export const create_scatter = (parent, data, xScale, yScale, xVar, yVar,  colorScale) => {
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
                }
            });

    //setup legend
    const legend = parent.selectAll(".legend");
}

export const create_geo = (parent, data, colorScale) => {
    parent.selectAll("svg > *").remove();
    console.log("running geo")
    const projection = d3.geoMercator();

    const geoGenerator = d3Geo.geoPath(projection)
    console.log(geoGenerator("Sweden"))
    //console.log(parent)
    const  graph = parent.selectAll("path").data(data)
    .join("path").attr("fill", "green").attr("d", geoGenerator(worldData) )
    console.log(graph)
}