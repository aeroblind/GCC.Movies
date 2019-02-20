import React, { Component } from 'react';
import * as OmdbApi from '../../_api/omdbApi';
import wrapper from '../../../util/wrapper';
import MovieCard from '../../components/movieCard';
import { connect } from 'react-redux';
import * as moviesActions from '../../_actions/moviesActions';
import Car from '../../models/Car';

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);

    this.history = props.history;

    this.state = {
      searchStr: ''
    }
  }

  componentDidMount() {
    this.props.search("Die Hard");
  }

  handleButtonClick(e, id) {
    this.history.push(`/${id}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { search } = this.props;
    const { searchStr } = this.state;
    search(searchStr);
  }

  handleSearchInput(e){
    this.setState({
      searchStr: e.target.value
    })
  }

  render() {
    const { movies } = (this.props);
    return (
      <div>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearchInput}/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div className="movie-list">
          {movies.length >= 0 && movies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} onButtonClick={this.handleButtonClick}></MovieCard>
          })}
        </div>
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