import PropsType from 'prop-types';
const Toggle = ({ checked, name, onChange, title }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <div className="w-11 h-6 bg-gray-900 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900">{title}</span>
    </label>
  );
};

Toggle.propTypes = {
  checked: PropsType.bool,
  name: PropsType.string,
  onChange: PropsType.func,
  title: PropsType.string,
};

export default Toggle;
