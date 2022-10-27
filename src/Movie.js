import React from 'react';

class Movie extends React.Component {
  render() {
    return (
      <>
        {this.props.movieData.map((results) => (
          <>
            <p>Movie Title</p>
            <p>{results.title}</p>
            <p>Movie Description</p>
            <p>{results.overview}</p>
          </>
        ))}
      </>
    )
  }

}
export default Movie;