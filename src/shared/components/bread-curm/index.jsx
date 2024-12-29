import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-white h-14 flex items-center my-4">
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul className="flex bg-white text-black mx-4">
          {items.map((item, index) => (
            <li key={index}>
              {index !== items.length - 1 ? (
                <Link to={item.url} className="text-blue-800 text-md">
                  {item.title}
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
              {index !== items.length - 1 && <span className="mr-1"> / </span>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Breadcrumb;
