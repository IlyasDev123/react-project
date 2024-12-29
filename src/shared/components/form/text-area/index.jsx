import { PropTypes } from 'prop-types';
const Index = ({
  className,
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  isDisabled,
  row = '4',
  maxLength,
}) => {
  const MAX_CHARACTERS = maxLength || 10000;

  const handleProcedureContentChange = (e) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CHARACTERS) {
      onChange(e);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <textarea
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleProcedureContentChange}
        onBlur={onBlur}
        disabled={isDisabled}
        rows={row}
        className={`appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      />
      <div className="absolute bottom-0 right-0 p-2 text-sm text-gray-500">
        {value.length}/{MAX_CHARACTERS}
      </div>
    </div>
  );
};

Index.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  row: PropTypes.string,
  maxLength: PropTypes.number,
};
export default Index;
