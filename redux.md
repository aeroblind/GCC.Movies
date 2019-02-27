# [REDUX!](https://redux.js.org/)

- Please refer to the link above to learn about Redux  There is no way I can cover redux in depth in this session.

## Initial Setup

1.  Clone repo. ```git@github.com:aeroblind/GCC.Movies.git```
2.  Switch to `redux` branch.

    - ```git fetch```
    - ```git checkout redux```

## What is Redux?

That's easy, it's a predictable state container for JavaScript apps.  Ok, what does that mean?  Let's find out....

## Glossary: Let's cover some new terms...

- **Actions:** 

  Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().

  Actions must include an _action type.  Here's an example of an action:

  ```
  {
    type: GET_MOVIES_SUCCESSFUL,
    movies,
  }
  ```
  Note: _GET_MOVIES_SUCCESSFUL_ is the **action type** and _movies_ is the **payload**.
  
- **Action Creators:**

  Action creators are exactly that—functions that create actions.
  
  Example:
  
  ```
  export function getMoviesSuccessful(movies) {
    return {
      type: GET_MOVIES_SUCCESSFUL,
      movies,
    };
  }
  ```
  
- **Reducers:**

  Reducers specify how the application's state changes in response to actions sent to the store.
  
  The reducer is a pure function that takes the previous state and an action, and returns the next state.
  
  Things you should **NEVER** do inside a reducer:

    - Mutate its arguments;
    - Perform side effects like API calls and routing transitions;
    - Call non-pure functions, e.g. Date.now() or Math.random().

  Example: 
  
  ```
  function moviesReducer(state = { movies:[] }, action) {
    switch (action.type) {
      case actionTypes.GET_MOVIES_SUCCESSFUL:
        return Object.assign({}, state, {
          movies: action.movies,
        });

      default:
        return state;
    }
  }
  ```
  
  Note that:

  - We don't mutate the state. We create a copy with Object.assign(). Object.assign(state, { visibilityFilter: action.filter }) is also wrong: it will mutate the first argument. You must supply an empty object as the first parameter. You can also enable the object spread operator proposal to write { ...state, ...newState } instead.

  - We return the previous state in the default case. It's important to return the previous state for any unknown action.

- **Store:**
  The Store is the object that brings them together. The store has the following responsibilities:

    - Holds application state;
    - Allows access to state via getState();
    - Allows state to be updated via dispatch(action);
    - Registers listeners via subscribe(listener);
    - Handles unregistering of listeners via the function returned by subscribe(listener).
    
## Setup: Boilerplate, Boilerplate and more Boilerplate!

1.  Install redux.  ```npm i --save redux```

1.  Install react-redux.```npm i --save react-redux```

1.  Install redux-thunk. ```npm i --save redux-thunk``` (Thunks!!)

1.  Create the follow directories in the _src_ directory:
    - _actions
    - _reducers
    - _store

1.  Create Actions.

    1.  Create an Action Type file.

        - In the **action** directory, create a new file called **actionTypes.js.

        - Add the following code in the new file:

          ```
          export const GET_MOVIES_SUCCESSFUL = 'GET_MOVIES_SUCCESSFUL';
          export const GET_MOVIES_FAILED = 'GET_MOVIES_FAILED';
          ```
          
    1.  Create an Action file.

        - In the **action** directory, create a new file called **moviesActions.js.

        - Add the following code in the new file:

          ```
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
                dispatch(getMoviesSuccessful(response.data.Search || []));
              } catch  (error) {
                dispatch(getMoviesFailed());
              }
            };
          }
          ```

1.  Create Reducers

    1.  In the **reducers** directory, create a new file named **moviesReducers.js**.
    
    1.  Add the following code to the new file:
    
        ```
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
        ```
        
    1.  In the **reducers** directory, create a new file named **index.js**.
    
    1.  Add the following code to the new file:
    
        ```
        import { combineReducers } from 'redux';
        import movies from './moviesReducers';

        const rootReducer = combineReducers({
          movies
        });

        export default rootReducer;
        ```
        
1.  Create the Store.

    1.  In the **store** directory, create a new file, **configureStore.js**
    
        - Add the following code to the new file:
        ```
        import { createStore, applyMiddleware } from 'redux';
        import thunk from 'redux-thunk';
        import rootReducer from '../_reducers';

        export default function configureStore(initialState) {
          return createStore(
            rootReducer,
            initialState,
            applyMiddleware(
              thunk
            ),
          );
        }
        ```
               
## Connect Redux to Components

1.  In **App.jsx**, import the following:

    ```import { Provider } from 'react-redux'```
    
    ```import configureStore from './_store/configureStore';```
    
2.  Replace all the code under the bootstrap imports with:
    
    ```
    const initialState = {};
    const store = configureStore(initialState);

    document.addEventListener('DOMContentLoaded', () => {
      const target = document.getElementById('root');
      if (target) {
        ReactDOM.render(
          <Provider store={store}>
            <BrowserRouter>
              <AppRoutes/>
            </BrowserRouter>,
          </Provider>,
          target,
        );
      } else {
        console.warn('tried to load React and failed :(');
      }
    });
    ```
    
1.  In **Movies.jsx**, import ```import { connect } from 'react-redux';```

1.  In **Movies.jsx**, replace the export statement with:

    ```
    export default connect(mapStateToProps, mapDispatchToProps)(Movies);
    ```
    
1.  In **Movies.jsx**, add the follow function above the export statement:
    
    ```
    function mapStateToProps(state) {
      return {
        movies: state.movies.movies
      };
    }

    function mapDispatchToProps(dispatch) {
      return {
        search: (searchStr) => dispatch(moviesActions.searchMovies(searchStr)),
      };
    }
    ```
  
1.  In **Movies.jsx**, replace the asyc searchMoviesWithString with:

    ```
    searchMoviesWithString(searchStr) {
      const { search } = this.props;
      search(searchStr);
    }
    ```
1.  In **Movies.jsx**, in the render function change movies declaration to:

    ```
    const { movies } = this.props;
    ```
    
1.  Done....with the Movies Component.  Can you update the Movie Component on your own? 
        
      
      
        
  
