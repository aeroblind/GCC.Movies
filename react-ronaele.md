
# Ronaele.UI.Web

## Review Current State: MandI

#### React Code (Content => react => mandi => index.js (entry point))

```
...
document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('react-mount');
  if (mountPoint) {
    ReactDOM.render(<App />, mountPoint);
  } else {
    console.warn('Couldn\'t find mount point react-mount');
  }
});

```


#### Webpack (webpack.config.js)

```

module.exports = {
  entry: {
    ...
    mandi: "./Content/react/mandi",
    ...
  },
...

```

#### Views (Mandi => Index.cshtml)

```
@section header {
    @Html.RequireWebpackAsset("mandi", "js")
}

...

<div id="react-mount" class="container-fluid"></div>

```

## Convert Home Page

#### React

- Create a `home` folder in the react folder.
- Create an `index.js` file in the `home` folder.
- Add the following code to the `index.js` file:

  ```
  
  import React from 'react';
  import ReactDOM from 'react-dom';
  import SiteLogins from './siteLogins';

  document.addEventListener('DOMContentLoaded', () => {
    const mountPoint = document.getElementById('react-mount');
    if (mountPoint) {
      ReactDOM.render(<SiteLogins />, mountPoint);
    } else {
      console.warn('Couldn\'t find mount point react-mount');
    }
  });
  
  ```
- Create an `siteLogins` folder in the `home` folder.
- Create a `display.js` file in the `sitelogins` folder.
- Create an `index.js` file in the `siteLogins` folder.

- In the `index.js` file, add the following code:

  ```
  
  import React, { Component } from 'react';
  import Display from './display';
  import * as api from '../api';

  class SiteLogins extends Component {

    constructor(props) {
      super(props);

      this.state = {
        loginTokenInfo: {
          sites: [],
          inStoreSites: [],
          username: '',
          time: '',
          signature: '',
        },
      };
    }
    async componentDidMount() {
      const loginTokenInfo = await api.getLoginTokenInfo();
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        loginTokenInfo,
      });
    }

    render() {
      const { loginTokenInfo } = this.state;
      return <Display loginTokenInfo={loginTokenInfo} />;
    }
  }

  export default SiteLogins;
  
  ```
  
- In the `display.js` file, add the following code:

  ```
  
  import React from 'react';
  import { array, string, shape } from 'prop-types';

  const Display = ({ loginTokenInfo }) => {
    const { sites, inStoreSites, username, time, signature } = loginTokenInfo;

    return (
      <div>
        <div className="container">
          <h2>Online</h2>
          <div className="manage-form container">
            <div id="login-container" className="form-group">
              {sites.length > 0 && sites.map(site => (
                <form key={site.name} method="POST" target="_blank" action={site.url}>
                  <input type="hidden" name="signature" value={signature} />
                  <input type="hidden" name="time" value={time} />
                  <input type="hidden" name="username" value={username} />
                  <p />
                  <div className="row control-group">
                    <div className="col-sm-3"><strong>{site.name}</strong></div>
                    <div className="col-sm-7" />
                    <div className="col-sm-2 last">
                      <button id="gcc-site-login-btn" className="btn" type="submit">Login</button>
                    </div>
                  </div>
                </form>
              ))
              }
            </div>
          </div>
        </div>
        <div className="container">
          <br />
        </div>
        <div className="container">
          <h2>In-Store</h2>
          <div className="manage-form container">
            <div id="login-container-in-store" className="form-group">
              {inStoreSites.length > 0 && inStoreSites.map(site => (
                <form key={site.name} method="POST" target="_blank" action={site.url}>
                  <input type="hidden" name="signature" value={signature} />
                  <input type="hidden" name="time" value={time} />
                  <input type="hidden" name="username" value={username} />
                  <p />
                  <div className="row control-group">
                    <div className="col-sm-3"><strong>{site.name}</strong></div>
                    <div className="col-sm-7" />
                    <div className="col-sm-2 last">
                      <button className="btn" type="submit" data-bind="enable: enableLoginButton">Login</button>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  Display.propTypes = {
    loginTokenInfo: shape({
      sites: array.isRequired,
      inStoreSites: array.isRequired,
      username: string.isRequired,
      time: string.isRequired,
      signature: string.isRequired,
    }).isRequired,
  };

  export default Display;
  
  ```
  
- Create an 'api' folder in the 'home' folder.
- Create an 'index.js' file in the 'api' folder.
- Add the following code to the 'index.js' file.

  ```
  
  import axios from 'axios';


  // eslint-disable-next-line import/prefer-default-export
  export async function getLoginTokenInfo() {
    const url = '/login-token-info';
    const response = await axios.get(url);
    return response.data;
  }
  
  ```
  
#### Webpack

- In `webpack.config.js`, add the following line to the `entry` object:

  `home: "./Content/react/home/index",`

#### Views (Home => Index.cshtml)

- Replace contents of the `Index.cshtml` file with the following:

  ```
  @using Ronaele.UI.Web.Controllers
  @using Veyron.Web.Mvc.Helpers
  @{
      Layout = "~/Views/Shared/SiteLayout.Nitro.cshtml";
      ViewBag.Title = "Home";
  }

  @section BreadCrumb{
      @*Site as of Sprint @Html.SprintNumber(typeof(HomeController)) (Build: @Html.BuildNumber(typeof(HomeController)))*@
  }

  @section Header{
      @Html.RequireWebpackAsset("home", "js")
  }

  <div id="react-mount" class="container-fluid"></div>
  ```
  
- Rebuild Solution
- psake watch-ronaele
- Click on a login button.  Did it work?



