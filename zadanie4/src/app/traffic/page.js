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
    const chartData = [
      ["Time", "Number of visitors", { role: "style" }],
      ["6:00-15:00", 0, "blue"],
      ["15:00-21:00", 0, "blue"],
      ["21:00-24:00", 0, "blue"],
      ["24:00-6:00", 0, "blue"],
    ];
    const timeZone = 2;

    Object.keys(data).forEach((key) => {
      const hour = Number(key.substring(key.length - 2, key.length)) + timeZone;

      if (hour >= 6 && hour < 15) {
        chartData[1][1] += data[key];
      } else if (hour >= 15 && hour < 21) {
        chartData[2][1] += data[key];
      } else if (hour >= 21 || hour === 0) {
        chartData[3][1] += data[key];
      } else {
        chartData[4][1] += data[key];
      }
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
