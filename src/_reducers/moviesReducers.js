import * as actionTypes from '../_actions/actionTypes';

export default function moviesReducer(state = { movies:[] }, action) {
  switch (action.type) {
    case actionTypes.GET_MOVIES_SUCCESSFUL:
      return Object.assign({}, state, {
        movies: action.movies,
      });
      
    default:
      return state;
  }
}