"use client";

import { Chart } from "react-google-charts";

export default function ChartWrapper(props) {
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={props.chartData}
    ></Chart>
  );
}
