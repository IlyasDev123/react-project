import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/layout/sidebar'; // Import your Sidebar component
import Header from '../components/layout/header'; // Import your Header component

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
      <Header />
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <main className="col-span-9">
          <Component />
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  Component: PropTypes.elementType.isRequired,
  isProtectedRoute: PropTypes.bool.isRequired, // Prop for protected route check
};

export default Layout;
