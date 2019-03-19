
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


#### Webpack

- Add the following to the entry object:

  `home: "./Content/react/home/index",`
  


