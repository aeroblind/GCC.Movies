import React, { Component } from 'react';

class MovieCard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { movie, onButtonClick } = this.props;
    return (
      <div className="movie-card card" style={{width: '18rem'}}>
        <img className="card-img-top" src={movie.Poster} height={420} width={280} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">{`${movie.Year} ${movie.Title}`}</h5>
          <button href={`/${movie.imdbID}`} className="btn btn-primary" onClick={(e) => onButtonClick(e, movie.imdbID) }>Details</button>
        </div>
      </div>
    );
  }
}

export default MovieCard;