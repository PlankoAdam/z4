"use client";
import { useForm } from "react-hook-form";
import PlaceInfo from "./placeInfo";
import { useState } from "react";

export default function PlaceSearch() {
  const { register, handleSubmit } = useForm();
  const [placeData, setPlaceData] = useState({});
  const [date, setDate] = useState("");

  const getPlace = async (formData) => {
    const query = formData.placeName;
    const res = await fetch(
      `https://geocode.maps.co/search?q=${query}&api_key=661fa7908e2f3349328565cky40b754`
    );
    const place = (await res.json())[0];

    setPlaceData(place);
    setDate(formData.date);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mx-auto">
        <form onSubmit={handleSubmit(getPlace)} className="flex flex-col mb-16">
          <h1 className="text-start  text-zinc-300 ">Search a location</h1>
          <input
            {...register("placeName", { required: true })}
            placeholder="New York"
            className="text-white px-2 mb-2 rounded-md h-10 bg-transparent border-zinc-300 border-2 placeholder:italic placeholder:text-zinc-500"
          ></input>
          <h1 className="text-start  text-zinc-300">Pick a date</h1>
          <input
            {...register("date", {
              required: true,
              validate: (d) => Number(d.substring(0, 4)) >= 1970,
            })}
            type="date"
            className="text-white  px-2 mb-6 rounded-md h-10 bg-transparent border-zinc-300 border-2 placeholder:italic placeholder:text-zinc-500"
          ></input>
          <input
            type="submit"
            value="Search"
            className="bg-teal-600 text-white rounded-sm py-2 px-4 cursor-pointer hover:bg-teal-800 transition-all h-10"
          ></input>
        </form>
      </div>
      <PlaceInfo placeData={placeData} date={date}></PlaceInfo>
    </div>
  );
}
