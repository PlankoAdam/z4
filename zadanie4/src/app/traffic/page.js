"use client";

import { useEffect, useState } from "react";
import ChartWrapper from "./chartWrapper";
import Searches from "./searches";

export default function Traffic() {
  const [visits, setVisits] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getTraffic();
  }, []);

  const getTraffic = async () => {
    const res = await fetch("https://node92.webte.fei.stuba.sk:5004/");
    const data = await res.json();
    console.log(data);
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
    <div className="flex flex-col items-center lg:px-32 px-10">
      <div className="w-full">
        <ChartWrapper chartData={chartData}></ChartWrapper>
      </div>
      <div className="mt-10 flex-1 min-w-fit">
        <Searches></Searches>
      </div>
    </div>
  );
}
