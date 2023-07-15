import { makeApiCall } from "./rest.service"
import { GEO_BASE_URL } from "../constants/url.constant"

export const fetchLocationSuggestions = (query) => {
  const url = `${GEO_BASE_URL}v1/search?name=${query}`
  return makeApiCall('GET', url);
}
