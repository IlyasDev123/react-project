import PropTypes from 'prop-types';

const Icon = ({ size, color, FaIcon }) => <FaIcon size={size} color={color} />;

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  FaIcon: PropTypes.elementType.isRequired,
};

export default Icon;
