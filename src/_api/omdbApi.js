
import axios from 'axios';
import config from '../../config';

const baseUrl = config.baseUrl;
const apiKey = config.apiKey;

function search(searchStr) {
  const searchUri = encodeURIComponent(searchStr);
  console.log(searchUri);
  return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchUri}`);
}

function searchByImdbId(id) {
  return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
}

export {
  search,
  searchByImdbId
}