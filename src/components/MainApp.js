import React, { useReducer, useEffect } from "react";
import Header from "./Header";
import Movie from "./Movie";
import spinner from "../assets/loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=India&apikey=b9bd48a6";

const MainApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

  const search = (searchValue) => {
    if (searchValue !== "") {
      dispatch({
        type: "SEARCH_MOVIES_REQUEST",
      });

      axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=b9bd48a6`).then(
        (jsonResponse) => {
          console.log(jsonResponse.data);
          if (jsonResponse.data.Response === "True") {
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.data.Search,
            });
          } else {
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.data.Error,
            });
          }
        }
      );
    } else {
      dispatch({
        type: "SEARCH_MOVIES_FAILURE",
        error: "Please input text in search box",
      });
    }
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="Movie Web App" />

        <Search search={search} />

        <p className="App-intro">List of few favorite movies</p>

        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default MainApp;
