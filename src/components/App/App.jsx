import React, { useState, useMemo, useEffect } from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue, LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { fetchBaseBallData } from '../../utils/utils.js';

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchBaseBallData()
      .then (res => setData(res));
  }, []);
  console.log(data);
  // const xMax = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row.totalSize;
  // accessors return the label and value of that data item
  const x = d => d.playerName;
  const y = d => d.avg;

  // const yMax = height - verticalMargin;
  const width = 800;
  const height = 400;
  // bounds
  const xMax = width - 80;
  const yMax = height - 80;
  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [0, yMax],
    domain: [Math.max(...data.map(y)), 0]
  });
  return (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal"/>
      <rect
        width={width}
        height={height}
        fill={'#FFFFFF'}
        rx={14}
      />
      <Group top={25} left={55}>
        <AxisLeft left={10} scale={yScale} numTicks={4} label="AVB" />
        {data.map((d, i) => {
          const label = x(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(y(d));
          const barX = xScale(label);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${label}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={'url(#teal)'}
              onClick={() => {
                alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
        <AxisBottom scale={xScale} label="Player" labelOffset={15} top={yMax} />
      </Group>
    </svg>
  );}
