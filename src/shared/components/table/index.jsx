import { useState } from 'react';
import { useTable } from 'react-table';
import Card from '../card';
import PropTypes from 'prop-types';
import Pagination from '../paginate';
import { FaFilter, FaPlusCircle, FaSearch } from 'react-icons/fa';
import Filter from '../filter';

function DynamicTable({
  columns,
  data,
  handleSearch,
  filterItems,
  handleSubmitFilter,
  handleAddForm,
  isPaginationRequired = true,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const handleFilterShow = () => {
    setShowFilter(true);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  return (
    <Card customClass="bg-white">
      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="search"
            id="default-search"
            name="search"
            onChange={handleSearch}
            className="block w-1/2 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required=""
          />
        </div>
        {handleAddForm && (
          <button
            className="flex items-center mr-2"
            data-drawer-target="drawer-contact"
            data-drawer-show="drawer-contact"
            aria-controls="drawer-contact"
            type="button"
            onClick={handleAddForm}
          >
            <FaPlusCircle className="w-6 h-6 text-blue-700" />
          </button>
        )}
        {filterItems && (
          <button
            className="flex items-center mr-10"
            data-drawer-target="drawer-contact"
            data-drawer-show="drawer-contact"
            aria-controls="drawer-contact"
            type="button"
            onClick={handleFilterShow}
          >
            <FaFilter className="w-6 h-6 text-gray-500" />
          </button>
        )}
      </div>
      {showFilter && filterItems && (
        <Filter
          handleCloseFilter={handleFilterClose}
          filterItems={filterItems}
          handleSubmitFilter={handleSubmitFilter}
        />
      )}

      <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
        <table
          {...getTableProps()}
          className="w-full divide-y divide-gray-200 overflow-x-auto"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup, index) => (
              <tr
                key={`header-group-${index}`}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    key={`header-${columnIndex}`}
                    {...column.getHeaderProps()}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {data && data.length > 0 ? (
              rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr key={`row-${rowIndex}`} {...row.getRowProps()}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={`cell-${rowIndex}-${cellIndex}`}
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isPaginationRequired && data && data.length > 0 && <Pagination />}
    </Card>
  );
}

DynamicTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleSearch: PropTypes.func,
  filterItems: PropTypes.array,
  handleSubmitFilter: PropTypes.func,
  handleAddForm: PropTypes.func,
  isPaginationRequired: PropTypes.bool,
};

export default DynamicTable;
