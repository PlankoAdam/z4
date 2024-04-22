import { useEffect, useState } from "react";
import WeatherDay from "./weatherDay";

export default function WeatherWidget(props) {
  // const [placeName] = useState(props.placeName);
  if (!props.weather.forecast) return null;

  const [avgTemp, setAvgTemp] = useState(0);
  useEffect(() => {
    setAvgTemp(
      getAvgTemp(
        props.weather.location.lat,
        props.weather.location.lon,
        props.date
      )
    );
  }, [props.weather]);

  const days = props.weather.forecast.forecastday.map((day) => {
    return <WeatherDay weather={day}></WeatherDay>;
  });

  const getAvgTemp = async (lat, lon, date) => {
    // console.log(date.substring(0, 3));
    if (Number(date.substring(0, 4)) > 2023) date = "2023" + date.substring(4);
    console.log(date);
    const startDate = date.substring(0, date.length - 2) + "01";
    const endDate = date.substring(0, date.length - 2) + "28";
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean`
    );
    const data = await res.json();
    const temps = data.daily.temperature_2m_mean;

    const sum = temps.reduce((a, b) => a + b, 0);
    const avg = sum / temps.length || 0;

    return Math.round(avg * 10) / 10;
  };

  return (
    <div>
      <h1 className="font-bold text-4xl mb-5">
        {props.weather ? props.weather.location.name : ""}
      </h1>
      <div className="flex flex-row border-s border-zinc-500 mb-5">{days}</div>
      <div className="flex flex-row text-xl justify-center">
        <p className="text-zinc-300 me-2 font-light">
          Average temperature in the month:
        </p>
        <div className="flex flex-row font-bold min-w-fit">
          <p>{avgTemp}</p>
          <p>°C</p>
        </div>
      </div>
    </div>
  );
}
