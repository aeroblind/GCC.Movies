import React, { Component } from 'react';
import * as OmdbApi from '../../_api/omdbApi';
import wrapper from '../../../util/wrapper';
import MovieCard from '../../components/movieCard';
import { connect } from 'react-redux';
import * as moviesActions from '../../_actions/moviesActions';

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleSearchResults = this.handleSearchResults.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.history = props.history;
  }

  componentDidMount() {
    this.props.search("Die Hard");
  }

  handleSearchResults({error, response}){
    if(error) {
      return console.error(error);
    }
    this.setState({
      movieList: response.data.Search
    })
  }

  handleButtonClick(e, id) {
    this.history.push(`/${id}`);
  }

  render() {
    const { movies } = (this.props);
    return (
      <div className="movie-list">
      <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        {movies.map((movie, index) => {
          return <MovieCard key={index} movie={movie} onButtonClick={this.handleButtonClick}></MovieCard>
        })}
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);