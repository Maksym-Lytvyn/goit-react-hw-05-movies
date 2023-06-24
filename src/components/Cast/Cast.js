import React, { useEffect, useState } from 'react';
import CastStyled from './Cast.module.css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';

const Cast = () => {
  const { itemId } = useParams();
  const [cast, setCast] = useState(null);
  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${itemId}/credits?api_key=2318a87e523df0b23f46c25d40d5fc09`
        );
        console.log(response);
        setCast(response.data.cast);
      } catch (error) {
        Notiflix.Notify.failure(
          'Нажаль виникла помилка. Спробуйте змінити запит'
        );
      }
    };
    fetchCastData();
  }, [itemId]);

  if (!cast) {
    return <div>Завантаження...</div>;
  }
  return (
    <section>
      <h4 className={CastStyled.cast_text}>Cast</h4>
      {cast.map(actor => (
        <li key={actor.id} className={CastStyled.cast_list}>
          {actor.name}
        </li>
      ))}
    </section>
  );
};

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ),
};

export default Cast;
