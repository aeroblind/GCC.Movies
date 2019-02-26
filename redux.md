# [REDUX!](https://redux.js.org/)

- Please refer to the link above to learn about Redux  There is no way I can cover redux in depth in this session.

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
  _GET_MOVIES_SUCCESSFUL_ is the **action type** and _movies_ is the **payload**.
  
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
  
  Things you should **NEVER**
  
  do inside a reducer:

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
