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
1.  In **Movies.jsx**, _./src/pages/movies_, add the following component lifecycle function:
    ```
    componentDidMount() {
    }
    ```
    Learn more about component lifecycle functions [here](https://reactjs.org/docs/react-component.html)
1.  Add the following code to the **componentDidMount** function:
    ```
    try {
      const movies = await OmdbApi.search("Die Hard")
    } catch (error) {
      console.error(error);
    }
    ```
1.  Refresh browser and review browser console.
1.  Add `async` before **componentDidMount**
  
    
    
