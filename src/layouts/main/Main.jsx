import React, { Component } from 'react';
import Header from '../../components/header';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {children} = this.props;
    return (
      <div>
        <Header onSearch={this.handleSearch}></Header>
        <div className="container">
          <div className="row">
            <div className="page-container">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;