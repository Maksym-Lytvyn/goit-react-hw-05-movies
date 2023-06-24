import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GoBack = ({ location }) => {
  const navigate = useNavigate();
  console.log(location);
  return (
    <button
      type="button"
      onClick={() => navigate(location.state?.from ?? '/')}
      style={{ marginLeft: '10px', marginBottom: '15px' }}
    >
      Go back
    </button>
  );
};

GoBack.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GoBack;
