import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import * as d3 from 'd3';
import data from './data.csv';
import gdpData from './gdp_data.csv'
import './App.css';
import { GraphContainer } from './graphcontainer'
import stateData from './states.json'
import { color } from 'd3';

function App() {
  const [stateNum, updateState] = useState(0);
  const [wvsData, setWvsData] = useState(null)

  //load wvs data
  useEffect(() => {
    console.log("recalculating colors")
    d3.csv(data).then(read => {
      setWvsData(read)
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">

        <div className="content-container">
          <h3> {stateData[stateNum].text}</h3>
          <p className="content">{stateData[stateNum].content}</p>
          {stateNum > 0 && (<button onClick={() => updateState(stateNum - 1)}> Previous </button>)}
          {(stateNum !== Object.keys(stateData).length -1) && (<button onClick={() => updateState(stateNum + 1)}> Next </button>)}
        </div>
        {wvsData ? (<GraphContainer data={wvsData} series={stateData[stateNum].series} stateNum={stateNum}  />) : (<p>Loading...</p>)}

      </header>
    </div>
  );
}

export default App;
