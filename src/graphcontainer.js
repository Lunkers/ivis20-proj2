import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { create_scatter, create_geo } from './graph_functions';

export function GraphContainer({ data, series, var1, var2, stateNum }) {
    let d3Container = useRef(null);

    useEffect(
        () => {
            if (data && d3Container.current) {
                if (stateNum < 3) {
                    var1 = "PerHea"
                    var2 = "Happy"
                } else if (stateNum < 6){
                    var1 = "WilFig"
                    var2 = "StaTru"
                } else if (stateNum < 9) {
                    var1="LifSat";
                    var2="FinSat"
                } else {
                    var1 = "SVI_short"
                    var2 = "IndEmp2"
                }

                //filter data, and remove countries without any.
                const fData = data.filter(d => d.wave === series && d[var1] !== "" && d[var2] !== "")
                const cultures = data.map(d => d.CulZon)

                //set up color scale
                const colorScale = d3.scaleOrdinal()
                colorScale.domain(cultures)
                colorScale.range(d3.schemeCategory10)

                //Create scales for values
                const xScale = d3.scaleLinear().domain([
                    d3.min(data, d => d[var1]), d3.max(data, d => d[var1])
                ]).range([75, 625])
                const yScale = d3.scaleLinear().domain([
                    d3.max(data, d => d[var2]), d3.min(data, d => d[var2])
                ]).range([25, 625])

                const svg = d3.select(d3Container.current);
                //draw graph

                create_scatter(svg, fData, xScale, yScale, var1, var2, colorScale, series)
            }
        }, [data, d3Container.current, series, stateNum])

    return (
        <svg
            className="d3-component"
            ref={d3Container}
            width={"80vw"}
            height={"100vh"}
        />
    )
}