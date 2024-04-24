"use server";

import { getClient } from "@/lib/redis";

export async function createPlaceSearch(searchData) {
  const client = await getClient();
  if (!client) return null;

  console.log("CREATE PLACE SEARCH");

  try {
    if (!client.isOpen) await client.connect();
  } catch (error) {
    console.log("create catch: ", error);
  }

  const { place, country } = searchData;

  const id = `${place},${country}`;

  const oldCount = Number(await client.hGet(`placeSearches:${id}`, "count"));
  const newCount = oldCount ? oldCount + 1 : 1;

  await client.hSet(`placeSearches:${id}`, {
    place,
    country,
    count: newCount,
  });

  await client.sAdd("placeSearchIDs", id);
}

export async function getPlaceSearches() {
  const client = await getClient();
  if (!client) return [];

  console.log("GET PLACE SEARCH");

  try {
    if (!client.isOpen) await client.connect();
  } catch (error) {
    console.log("get catch: ", error);
    return [];
  }

  const ids = await client.sMembers("placeSearchIDs");

  let result = await Promise.all(
    ids.map((id) => client.hGetAll(`placeSearches:${id}`))
  );

  result = result.map((e) => {
    return Object.assign({}, e);
  });

  console.log(result);
  return result;
}
