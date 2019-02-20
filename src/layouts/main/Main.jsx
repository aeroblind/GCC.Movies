import React, { Component } from 'react';
import Header from '../../components/header';
import * as OmdbApi from '../../_api/omdbApi';
import wrapper from '../../../util/wrapper';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleSearchResults = this.handleSearchResults.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      movieList: []
    }
  }

  handleSearchResults({error, response}){
    if(error) {
      return console.error(error);
    }
    this.setState({
      movieList: response.data.Search
    });
  }

  async handleSearch(searchStr) {
    this.handleSearchResults(await wrapper(OmdbApi.search(searchStr)));
  }

  render() {
    const {children} = this.props;
    const {movieList} = this.state;
    const childrenWithProps = React.cloneElement(children, { movielist: movieList });
    return (
      <div>
        <Header onSearch={this.handleSearch}></Header>
        <div className="container">
          <div className="row">
            <div className="page-container">
              {childrenWithProps}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;