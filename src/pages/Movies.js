import Searchbar from 'components/Searchbar/Searchbar';
import MovieResults from 'components/MovieResults/MovieResults';
import MoviesStyled from './MoviesStyled.module.css';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const { itemId } = useParams();
  const navigate = useNavigate();

  const handleSearchSubmit = useCallback(
    async request => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${request}&api_key=2318a87e523df0b23f46c25d40d5fc09`
        );
        setSearchResults(response);
        console.log(response);
        searchParams.set('request', request);
        navigate(`/movies?${searchParams.toString()}`);
      } catch (error) {
        console.log('error', error);
      }
    },
    [navigate, searchParams]
  );

  useEffect(() => {
    const fetchMovies = async () => {
      if (!itemId) return;
      try {
        const response = await axios.get(
          `/search/movie?query=${itemId}&api_key=2318a87e523df0b23f46c25d40d5fc09`
        );
        console.log(response);
        setSearchResults(response);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchMovies();
  }, [itemId]);

  useEffect(() => {
    const request = searchParams.get('request');
    if (request) {
      handleSearchSubmit(request);
    }
  }, [searchParams, handleSearchSubmit]);

  return (
    <div>
      <h2 className={MoviesStyled.styled_title}>Movies</h2>
      <Searchbar onSubmit={handleSearchSubmit} />
      <br />
      <MovieResults results={searchResults} />
    </div>
  );
};
export default Movies;
