// eslint-disable-next-line react/prop-types
const Index = ({ children, customClass, onClick }) => {
  const baseClasses =
    'rounded-md transition duration-300 ease-in-out focus:outline-none';

  return (
    <button className={`${baseClasses} ${customClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Index;
