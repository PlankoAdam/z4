"use client";

import { getPlaceSearches } from "@/actions/placeSearches";
import { useEffect, useState } from "react";

export default function Searches() {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getPlaceSearches();
    setSearchData(data);
    console.log(data);
  };

  const tableRows = searchData.map((row) => {
    return (
      <tr className="odd:bg-zinc-900 even:bg-zinc-800">
        <td className="p-2">{row.place}</td>
        <td className="p-2">{row.country}</td>
        <td className="p-2">{row.count}</td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead className="bg-zinc-600">
          <tr>
            <th className="text-start p-2">Place</th>
            <th className="text-start p-2">Country</th>
            <th className="text-start p-2">Count</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}
