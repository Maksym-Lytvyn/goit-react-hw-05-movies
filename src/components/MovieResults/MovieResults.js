import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieResults = ({ results }) => {
  const location = useLocation();

  if (!results || !results.data || !results.data.results) {
    return null;
  }
  return (
    <section>
      <ul>
        {results.data.results.map(result => (
          <li key={result.id}>
            <Link to={`/movies/${result.id}`} state={{ from: location }}>
              {result.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

MovieResults.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default MovieResults;
