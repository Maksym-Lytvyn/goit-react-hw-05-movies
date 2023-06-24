import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Notiflix from 'notiflix';

const Reviews = () => {
  const { itemId } = useParams();
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${itemId}/reviews?api_key=2318a87e523df0b23f46c25d40d5fc09`
        );
        console.log(response);
        setReviews(response.data.results);
      } catch (error) {
        Notiflix.Notify.failure(
          'Нажаль виникла помилка. Спробуйте змінити запит'
        );
      }
    };
    fetchCastData();
  }, [itemId]);

  if (!reviews) {
    return <div>Завантаження...</div>;
  }
  return (
    <section>
      <h4>Reviews</h4>
      {!reviews && (
        <p>
          Відгуків на цю стрічку ще немає. Будьте першим, хто залишить свою
          думку
        </p>
      )}
      {reviews.map(comment => (
        <div>
          <li key={comment.id}>{comment.author}</li>
          <p>{comment.content}</p>
        </div>
      ))}
    </section>
  );
};
export default Reviews;
