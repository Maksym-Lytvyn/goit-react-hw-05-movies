import GoBack from 'components/GoBack/GoBack';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MovieStyled from './MovieDetails.module.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MovieDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const location = useLocation();
  const locationRef = useRef(location);

  useEffect(() => {
    const fetchDetailedData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${itemId}?language=ua-UA&api_key=2318a87e523df0b23f46c25d40d5fc09`
        );
        console.log(response);
        setItem(response.data);
      } catch (error) {
        Notiflix.Notify.failure(
          'Нажаль виникла помилка. Спробуйте змінити запит'
        );
      }
    };
    fetchDetailedData();
  }, [itemId]);

  if (!item) {
    return <div>Завантаження...</div>;
  }
  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.status}
        className={MovieStyled.pic_styled}
      />
      <br />
      <GoBack location={locationRef.current} />
      <div className={MovieStyled.det_styled}>
        <h3>{item.title}</h3>
        <p className={MovieStyled.tit_styled}>
          User score: {item.vote_average}
        </p>
        <p className={MovieStyled.tit_styled}>Overview</p>
        <p>{item.overview}</p>
        <p className={MovieStyled.tit_styled}>Genres</p>
        <p>
          {item.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </p>
        <p className={MovieStyled.tit_styled}>Additional information</p>
        <div>
          <ul>
            <Link to="cast">
              <li>Cast</li>
            </Link>
            <Link to="reviews">
              <li>Reviews</li>
            </Link>
          </ul>
          <Outlet />
        </div>
      </div>
    </section>
  );
};
export default MovieDetails;
