import PropTypes from 'prop-types';
const InputField = ({
  type,
  placeholder,
  onChange,
  value,
  name,
  onBlur,
  className,
  isDisabled,
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const isValidInput =
      type === 'number' ? /^\d+(\.\d{0,2})?$/.test(inputValue) : true;

    if (isValidInput || inputValue === '') {
      onChange(e);
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handleInputChange}
      onBlur={onBlur}
      value={value}
      className={`w-full border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-500 ${className}`}
      disabled={isDisabled}
    />
  );
};
InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  className: '',
};

InputField.propTypes = {
  type: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
};
export default InputField;
