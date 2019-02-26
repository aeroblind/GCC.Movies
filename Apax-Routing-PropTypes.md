# GCC.Movies

## Setup

- Clone Repo  
  
  `https://github.com/aeroblind/GCC.Movies.git`
  
- Create `.env` file in root directory

  Add the following to the file: `APIKEY=abdd6d3f`

- Review Change to Webpack Config

  1.  Output. [hash] generates a unique id for every build.
  
  2.  plugins:
  
      - **clearWebpackPlugin**: Removes all files listed in given directory ('dist').
      
      - **HtmlWebpackPlugin**: Injects the <script> tag into a html template file.
      
      - **DefinePlugin**: Allows for custom plugins.  For our use case, it allows us to use environment variables on the client side.
    
- Review Folder Structure.
 
  1.  `App.jsx` file. Imports Main layout file.
  
  1.  `layouts` folder. Layouts contain components used to structure the layout of the application.
  
  1.  `pages` folder.  Pages contains components responsible for maintaining state and layout of individual webpages.
  
  1.  `components` folder.  Contains lower level components.  These components are typically stateless.  
  
  1.  `routes` folder. Contains components used for routing.  Used in conjuction with React Router v4.
  
## AJAX in React

1.  Start app. `npm start`.

1.  Install axios. `npm i --save axios`

1.  Uncomment code found in `./src/_api/omdbApi.js`.

1.  In **Movies.jsx**, _./src/pages/movies_, uncomment the **omdb.js** import line.

    ```
    import * as OmdbApi from '../../_api/omdbApi
    ```
    
1.  In **Movies.jsx**, _./src/pages/movies_, add the following function:

    ```
    async searchMoviesWithString(searchStr) {
      try {
        const response = await OmdbApi.search(searchStr)
        this.setState({
          movies: response.data.Search || []
        });
      } catch (error) {
        console.error(error);
      }
    }
    ```
    
1.  In **Movies.jsx**, _./src/pages/movies_, add the following component lifecycle function:

    ```
    componentDidMount() {
      this.searchMoviesWithString(this.state.searchStr);
    }
    ```
    
    Learn more about component lifecycle functions [here](https://reactjs.org/docs/react-component.html)
    
1.  The browser should load images on load.

1.  Try using the search button?  Does it work?  Why not? A: It's using a form!  We must prevent its default behavior.

1.  Uncomment `e.preventDefault();` and try again.

1.  Now, let's route to the movie details!

## Client-Side Routing with React Router v4

1.  Install React Router. `npm i --save react-router-dom`

1.  Uncomment code in **AppRoutes.jsx**, _./src/routes.

1.  In **App.jsx**, _./src_, remove the `<Main></Main>`, uncomment the follow code:

    ```
     <BrowserRouter>
       <AppRoutes/>
     </BrowserRouter>,
    ```
    
1.  In **Main.jsx**, _./src/layouts/main_, remove `<Movies></Movies>`, uncomment the follow code:

    ```
    {/* {children} */}
    ```
    
1.  Look at `{children}`.  What is happening here?

1.  In **Movies.jsx**, _./src/pages/movies, uncomment the follow code in the handleButtonClick function:

    ```
    this.history.push(`/${id}`);
    ```
    
1.  This is much, much more to [React Router v4](https://reacttraining.com/react-router/web/guides/philosophy).  

## Prop Types

1.  How do we ensure/test expect props are being passed to a component.  Simple, use the prop-types library!

1.  Install.  ```npm i prop-types --save```

1.  In our app, the Movies.jsx component requires a history prop in order to navigate to the movie component.  Let's create     a prop-type rule to ensure the prop is available during development. 
    _Note: history is available to the movie component because **AppRoutes.jsx** is wrapped in **<BrowserRouter>**, an       higher order component made available by react router.  
  
1.  Import. In **Movies.jsx**, ./src/pages/movies, add the following import statement:
    ```
    import { object } from 'prop-types';
    ```
    
1.  Add the following code under the Movies class code block but above the _export default_ statement:
    ```
    Movies.propTypes = {
    history: object.isRequired
    }
    ```
1.  Save and inspect the browser console.  You should not see any errors.

1.  What happens when we change the name of the history prop type?  What do you see in the browser console?

1. When building reuseable components, using prop-types is great way to ensure downstream users use your components as you intended.   





    
    
