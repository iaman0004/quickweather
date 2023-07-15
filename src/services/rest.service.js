import axios from 'axios';
export const makeApiCall = (method, url, payload?) => {
  const axiosConfig = {
    method,
    url
  };
  if (['POST'].includes(method)) {
    axiosConfig.data = payload;
  }
  return axios(axiosConfig);
}
