import React, { useState, useMemo, useEffect } from 'react';
import baseBallData from '../../data.js';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue, LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';

export default function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    const mungedBaseballData = baseBallData
      .leader_hitting_repeater
      .leader_hitting_mux
      .queryResults.row.map(player => ({
        avg: player.avg,
        name: player.name_display_first_last
      }));    
    
    setData(mungedBaseballData);
  }, []);
  console.log(data);
  // const xMax = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row.totalSize;
  // const yMax = height - verticalMargin;

  return (<>
    <h1>Hello World</h1>
    <svg width={400} height={400}>
      <LinearGradient
        from={'#e9e9e9'}
        to={'#fff'}
        id={'gradientFill'}
      />
      <rect
        width={400}
        height={400}
        fill={'url(#gradientFill)'}
        rx={5}
      />
      <Bar
        key={'my-key'}
        x={500}
        y={200}
        width={800}
        height={500}
        fill="rgba(23, 233, 217, .5)"
      // onClick={() => {
      //   if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
      // }}
      />
    </svg>
  </>);
}
