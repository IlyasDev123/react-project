import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const PaginationContext = createContext();

const PaginationProvider = ({ children }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
  });

  return (
    <PaginationContext.Provider value={{ pagination, setPagination }}>
      {children}
    </PaginationContext.Provider>
  );
};

const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

PaginationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { PaginationProvider, usePagination };
