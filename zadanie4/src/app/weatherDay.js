export default function WeatherDay(props) {
  return (
    <div className="flex flex-col border-e border-zinc-500 p-3 w-36">
      <h1 className="mb-3 mx-auto text-zinc-300 font-light">
        {props.weather ? props.weather.date : ""}
      </h1>
      <div className="grid grid-cols-2 mb-4">
        <p className="text-zinc-300 font-light">Min:</p>
        <p className="text-end">
          {props.weather ? `${props.weather.day.mintemp_c}°C` : ""}
        </p>
        <p className="text-zinc-300 font-light">Max:</p>
        <p className="text-end">
          {props.weather ? `${props.weather.day.maxtemp_c}°C` : ""}
        </p>
      </div>
      <img
        src={props.weather.day.condition.icon}
        className="w-16 mx-auto mb-1"
      ></img>
      <p className="font-light text-center text-zinc-300 text-sm">
        {props.weather.day.condition.text}
      </p>
    </div>
  );
}
