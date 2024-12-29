import Select from 'react-select';
import PropTypes from 'prop-types';

const Index = ({
  className,
  name,
  options,
  onBlur,
  value,
  isDisabled,
  defaultValue,
  onChangeValue,
}) => {
  const handleChange = (selectedOption) => {
    // onChange(selectedOption.value);
    onChangeValue(selectedOption.value);
  };

  const selectedValue =
    options.find((option) => option.value === value) || null;

  return (
    <div className={className}>
      <Select
        name={name}
        options={options}
        value={selectedValue}
        onChange={handleChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        className={`${className}`}
        isDisabled={isDisabled}
        isSearchable={true} // Enable search functionality
      />
    </div>
  );
};

Index.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  onChangeValue: PropTypes.func.isRequired,
};

export default Index;
