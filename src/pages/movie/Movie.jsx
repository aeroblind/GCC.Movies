import React, { Component } from 'react';
import * as OmdbApi from '../../_api/omdbApi';
import wrapper from '../../../util/wrapper';

import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.imdbId = props.match.params.id

    this.state = {
      movie: {}
    }
  }

  async componentDidMount() {
    this.handleSearchResults(await wrapper(OmdbApi.searchByImdbId(this.imdbId)));
  }

  handleSearchResults({error, response}){
    if(error) {
      return console.error(error);
    }
    this.setState({
      movie: response.data
    })
  }

  render() {
    const { movie } = this.state;
    return (
      <div className="movie-container">
        <div className="movie-img">
          <img src={movie.Poster} width={300} height={450}/>
        </div>
        <div className="movie-details">
          <h1>{`${movie.Title} (${movie.Rated})`}</h1>
          <p>{movie.Plot}</p>
          <div>
            <h5>Actors</h5>
            {movie.Actors && movie.Actors.split(',').map((actor, index) => {
              return <div key={index}>{actor}</div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;