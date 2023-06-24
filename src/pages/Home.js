import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';
import MoviesStyled from './MoviesStyled.module.css';

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?&?language=ua-UA&api_key=2318a87e523df0b23f46c25d40d5fc09`
        );
        console.log(response);
        setData(response.data.results);
      } catch (error) {
        Notiflix.Notify.failure(
          'Нажаль виникла помилка. Спробуйте змінити запит'
        );
      }
    };
    fetchData();
  }, []);

  // const [theme, newTheme] = useState('white');
  // const Switch = () => {
  //     newTheme(!theme);
  // }

  return (
    // <main style={theme? {backgroundColor: `${theme}`, color: 'black'} : {backgroundColor: `black`, color: 'white'}}>
    //   <h1 className={MoviesStyled.styled_title}>Trending today</h1>

    <main>
      <h1 className={MoviesStyled.styled_title}>Trending today</h1>
      <ul>
        {data.map(item => (
          // <Link key={item.id} to={`/movies/${item.id}`} style={theme? {color: 'black'} : {color: 'white'}}>
          <Link key={item.id} to={`/movies/${item.id}`}>
            <ul>
              <li>{item.title}</li>
            </ul>
          </Link>
        ))}
      </ul>
      {/* <button onClick={Switch}>Тема</button> */}
      {/* <button>Тема</button> */}
    </main>
  );
};

export default Home;
