import SearchbarStyled from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleSearchSubmit = event => {
    event.preventDefault();
    onSubmit(request);
    setRequest('');
  };

  const handleInputChange = event => {
    setRequest(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          className={SearchbarStyled.inputStyled}
          value={request}
          onChange={handleInputChange}
        />
        <button type="submit" className={SearchbarStyled.buttonStyled}>
          Search
        </button>
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
