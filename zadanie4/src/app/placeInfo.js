import { useState, useEffect } from "react";
import WeatherWidget from "./weatherWidget";
import CurrencyWidget from "./currencyWidget";

export default function PlaceInfo(props) {
  if (!props.placeData) return null;
  if (!props.placeData.display_name) return null;
  if (!props.date) return null;
  const [countryData, setCountryData] = useState();
  const [weather, setWeather] = useState({});
  const [currency, setCurrency] = useState({});

  useEffect(() => {
    const parts = props.placeData.display_name.split(",");
    const countryName = parts[parts.length - 1].trim();
    getCountryData(countryName);
  }, [props.placeData]);

  const getCountryData = async (countryName) => {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const country = (await res.json())[0];
    setCountryData(country);
    for (const key in country.currencies) {
      setCurrency({
        name: country.currencies[key].name,
        short: key,
        rate: await getExchangeRates(key),
      });
      break;
    }
    getWeatherData(props.placeData.lat, props.placeData.lon);
  };

  const getWeatherData = async (lat, lon) => {
    const apiKey = "36645be79c3c4629ae6173234241704";
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}&days=3&key=${apiKey}`
    );
    const weather = await res.json();
    setWeather(weather);
    // console.log(lat);
    console.log(weather);
  };

  const getExchangeRates = async (currency) => {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/euro");
    const data = await res.json();

    return data.rates[currency];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center mb-8 w-full">
        <img
          src={
            countryData
              ? `https://countryflagsapi.netlify.app/flag/${countryData.cca2}.svg`
              : ""
          }
          className="w-48 max-w-48 me-8"
        ></img>
        <div className="grid grid-cols-[6rem_1fr] gap-2 w-full my-auto text-xl min-w-fit max-w-fit">
          <p className="text-end font-light text-zinc-300">Country:</p>
          <p>{countryData ? countryData.name.common : ""}</p>
          <p className="text-end font-light text-zinc-300">Capital:</p>
          <p>{countryData ? countryData.capital[0] : ""}</p>
          <p className="text-end font-light text-zinc-300">Currency:</p>
          <p>{currency.name}</p>
        </div>
      </div>
      <CurrencyWidget currency={currency}></CurrencyWidget>
      <WeatherWidget weather={weather} date={props.date}></WeatherWidget>
    </div>
  );
}
