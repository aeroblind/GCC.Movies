import React, { Component } from 'react';
import Header from '../../components/header';

class Main extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(process.env);
    return (
      <Header></Header>
    );
  }
}

export default Main;