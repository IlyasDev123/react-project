// eslint-disable-next-line react/prop-types
import PropTypes from 'prop-types';
const Index = ({
  children,
  headerText,
  subHeaderText,
  customClass,
  spacing = 'm-4',
  isCentered,
}) => {
  const baseClasses =
    'py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none';
  const textCenter = isCentered ? 'text-center' : '';
  return (
    <div className={`${baseClasses} ${customClass}`}>
      <h2 className={`text-xl font-semibold ${spacing} ${textCenter}`}>
        {headerText}
      </h2>
      {subHeaderText && <p className="text-gray-600 mb-4">{subHeaderText}</p>}
      {children}
    </div>
  );
};

Index.propTypes = {
  children: PropTypes.node.isRequired,
  headerText: PropTypes.string,
  subHeaderText: PropTypes.string,
  customClass: PropTypes.string,
  isCentered: PropTypes.bool,
  spacing: PropTypes.string,
};

export default Index;
