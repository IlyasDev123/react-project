import { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '../card';
import PropTypes from 'prop-types';
import { FaFilter, FaPlus, FaSearch } from 'react-icons/fa';
import Filter from '../filter';

function DynamicTable({
  columns,
  data,
  handleSearch,
  filterItems,
  handleSubmitFilter,
  handleAddForm,
  onDragSorted,
}) {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterShow = () => {
    setShowFilter(true);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <Card customClass="bg-white">
      <div className="mb-6 flex items-center">
        {handleSearch && (
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
        )}

        {handleAddForm && (
          <button
            className="flex items-center mr-2 bg-blue-700 w-24 h-8 rounded justify-center items-center text-white"
            data-drawer-target="drawer-contact"
            data-drawer-show="drawer-contact"
            aria-controls="drawer-contact"
            type="button"
            onClick={handleAddForm}
          >
            <FaPlus className="w-3 h-3 text-white" />
            <span className="px-2">Create</span>
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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span>&darr;</span>
                      ) : (
                        <span>&uarr;</span>
                      )
                    ) : (
                      ''
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) {
                return;
              }
              const sourceIndex = result.source.index;
              const destinationIndex = result.destination.index;
              const draggedRowData = rows[sourceIndex].original;
              const rowsBeforeDrag = rows.map((row) => row.original);
              const rowsAfterDrag = [...rowsBeforeDrag];
              rowsAfterDrag.splice(sourceIndex, 1);
              rowsAfterDrag.splice(destinationIndex, 0, draggedRowData);
              onDragSorted(rowsAfterDrag);
            }}
          >
            <Droppable droppableId="table">
              {(provided) => (
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.length > 0 ? (
                    rows.map((row, rowIndex) => {
                      prepareRow(row);
                      return (
                        <Draggable
                          key={`row-${rowIndex}`}
                          draggableId={`row-${rowIndex}`}
                          index={rowIndex}
                        >
                          {(provided) => (
                            <tr
                              key={`row-${rowIndex}`}
                              {...row.getRowProps()}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
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
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <tr className="m-4 px-10 py-4">
                      <td
                        colSpan={columns.length}
                        className="text-center px-10 py-10"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
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
  onDragSorted: PropTypes.func,
};

export default DynamicTable;
