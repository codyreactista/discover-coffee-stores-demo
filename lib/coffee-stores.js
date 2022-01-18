//initialize unsplash

import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
  const encodedLatLong = encodeURIComponent(latLong);
  const encodedQuery = encodeURI(query);

  return `https://api.foursquare.com/v3/places/nearby?ll=${encodedLatLong}&query=${encodedQuery}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "10.25,106.37",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee shops", limit),
    options
  );
  const data = await response.json();

  return data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      address: result.location.address || "",
      name: result.name,
      imgUrl: photos[idx],
    };
  });
};
