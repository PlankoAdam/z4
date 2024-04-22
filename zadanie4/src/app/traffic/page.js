"use client";

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Traffic() {
  const [visits, setVisits] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getTraffic();
  }, []);

  const getTraffic = async () => {
    const res = await fetch("https://node92.webte.fei.stuba.sk:5004/");
    const data = await res.json();
    const visits = parseTrafficData(data);
    setVisits(visits);
    setChartData(createChartData(visits));
  };

  const parseTrafficData = (data) => {
    const result = {};
    const hours = Object.keys(data.visits);
    hours.forEach((hour) => {
      result[hour] = Object.keys(data.visits[hour]).length;
    });
    return result;
  };

  const createChartData = (data) => {
    const chartData = [["Time", "Number of visitors", { role: "style" }]];
    const timeZone = 2;

    Object.keys(data).forEach((key) => {
      chartData.push([
        `${Number(key.substring(key.length - 2, key.length)) + timeZone}:00`,
        data[key],
        "gold",
      ]);
    });

    return chartData;
  };

  return (
    <div>
      <h1>Traffic</h1>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={chartData}
      ></Chart>
    </div>
  );
}
