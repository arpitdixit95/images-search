import { handleResponse } from './fetch';

const BASE_API_URL = process.env.BASE_API_URL;
const ACCESS_KEY = process.env.ACCESS_KEY;

const fireRequest = async (method, url, data) => {
  const options = {
    method,
    headers : {
      Authorization: `Client-ID ${ACCESS_KEY}`
    },
    body : data,
  };
  options.body
  try {
    const response = await fetch(url, options);
    const json = await handleResponse(response);
    return json;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  get(url, payload) {
    const qs = payload ? Object.keys(payload).reduce((accumulator, key, index) => {
      accumulator = index == 0 ? `${key}=${payload[key]}` : `${accumulator}&${key}=${payload[key]}`;
      return accumulator;
    }, '') : '';
    let finalUrl = `${BASE_API_URL}${url}`;
    if (qs && qs.length > 0) {
      finalUrl += `?${qs}`;
    }
    return fireRequest('GET', finalUrl);
  },
  post(url, data) {
    return fireRequest('POST', url, data);
  },
};