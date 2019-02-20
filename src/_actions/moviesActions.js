import { GET_MOVIES_SUCCESSFUL, GET_MOVIES_FAILED } from './actionTypes';
import * as omdbApi from '../_api/omdbApi';

export function getMoviesSuccessful(movies) {
  return {
    type: GET_MOVIES_SUCCESSFUL,
    movies,
  };
}

export function getMoviesFailed() {
  return {
    type: GET_MOVIES_FAILED,
    movies: [],
  };
}

export function searchMovies(searchStr) {
  return async function (dispatch) {
    try{
      const response = await omdbApi.search(searchStr)
      dispatch(getMoviesSuccessful(response.data.Search));
    } catch  (error) {
      console.log(`error ${error}`);
      dispatch(getMoviesFailed());
    }
  };
}
