import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Layout = ({ title, Component }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title + ' | Glampians';

    return () => {
      document.title = originalTitle;
    };
  }, [title]);

  return (
    <div className="">
      <main>
        <Component />
      </main>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  Component: PropTypes.elementType.isRequired,
  isProtectedRoute: PropTypes.bool.isRequired, // Prop for protected route check
};

export default Layout;
