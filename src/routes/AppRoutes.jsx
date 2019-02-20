import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Main from '../layouts/main';
import Dashboard from '../pages/dashboard';
import Movie from '../pages/movie';

class AppRoutes extends PureComponent {
  render() {
    return (
      <Main>
        <Switch>
          <Route path="/:id" component={Movie}></Route>
          <Route path="/" component={Dashboard}/>
        </Switch>
      </Main>
    );
  }
}

export default withRouter(AppRoutes);