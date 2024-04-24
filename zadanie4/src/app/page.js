"use client";

// import { addVisit } from "@/actions/visits.js";
import PlaceSearch from "./placeSearch.js";

fetch("https://node92.webte.fei.stuba.sk:5004/").then((res) =>
  console.log(res)
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <PlaceSearch></PlaceSearch>
    </main>
  );
}
