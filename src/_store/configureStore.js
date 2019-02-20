import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInVariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      reduxImmutableStateInVariant(),
    ),
  );
}