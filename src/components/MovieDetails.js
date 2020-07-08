import React, { useEffect, useState } from "react";
import Header from "./Header";
import {Link} from "react-router-dom";
export default function MovieDetails() {
  const [movie, setMovieInfo] = useState([]);

  let movie_info = window.location.pathname;
  let id = movie_info.split("/");

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=b9bd48a6&i=${id[1]}`)
      .then(response => response.json())
      .then(data => {
        setMovieInfo(data); 
      })
  }, [])

  
  return (
    <div>
    <Header text="Movie Web App" />
    <Link className="text-center border-css" to="/"><h3>Back</h3></Link>
    <div className="container">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <React.Fragment>
        <React.Fragment key={movie.Title}>
        <div className="movie-card-container">
                  <div className="image-container">
                      <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${movie.Poster})` }}
                      />
                  </div>
                  <div className="movie-info">
                      <h2>Movie Details</h2>
                      <div>
                          <h1>{movie.Title}</h1>
                          <small>Released Date: {movie.Released}</small>
                      </div>
                      <h4>Rating: {movie.imdbRating} / 10</h4>
                      <h4>Director:{movie.Director}</h4>
                      <h5>Actors:{movie.Actors}</h5>
                      <p>{movie.Plot && movie.Plot.substr(0, 350)}</p>
                      <div className="tags-container">
                          {movie.Genre && movie.Genre.split(', ').map(g => <span>{g}</span>)}
                      </div>
                  </div>
              </div>
        </React.Fragment>
    )}
  </React.Fragment>
    </div>
    </div>
  )
}
