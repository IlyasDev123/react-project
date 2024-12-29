import { useState } from 'react';
import Select from 'react-select';
import Label from 'shared/components/form/label';
import Input from 'shared/components/form/inputField';

import PropTypes from 'prop-types';

const FilterDrawer = ({
  handleCloseFilter,
  filterItems,
  handleSubmitFilter,
}) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName.toLowerCase()]: value }); // Update form data
  };

  const handleSelectChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName.toLowerCase()]: value?.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmitFilter(formData);
    handleCloseFilter();
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    setFormData(null);
  };

  return (
    <div
      id="drawer-contact"
      className="fixed top-0 right-0 z-[100] h-screen p-4 overflow-y-auto transition-transform  bg-white w-80 dark:bg-gray-800"
      tabIndex={100}
      aria-labelledby="drawer-contact-label"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-base font-semibold text-white uppercase mt-4"
      >
        Filter
      </h5>
      <button
        type="button"
        data-drawer-hide="drawer-contact"
        aria-controls="drawer-contact"
        onClick={() => handleCloseFilter(true)}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form className="mb-6">
        {filterItems &&
          filterItems.map((item, index) => (
            <div key={index}>
              {item.type === 'input' && (
                <div className="mb-6">
                  <Label
                    htmlFor={item.id}
                    title={item.title}
                    color="text-white"
                  />
                  <Input
                    id={item.id}
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    onChange={(e) =>
                      handleInputChange(item.name, e.target.value)
                    }
                  />
                </div>
              )}

              {item.type === 'select' && (
                <div className="mb-6">
                  <Label
                    htmlFor={item.id}
                    title={item.title}
                    color="text-white"
                  />
                  <Select
                    className="text-gray-900"
                    id={item.id}
                    onChange={(e) => handleSelectChange(item.title, e)}
                    options={item.options}
                    placeholder={item.placeholder}
                    isSearchable={true}
                    isClearable={true}
                  />
                </div>
              )}
            </div>
          ))}
        <div className="flex gap-2">
          <button
            onClick={handleResetForm}
            className="text-white bg-red-700 hover:bg-red-800 w-full focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 block"
          >
            Clear
          </button>
          <button
            onClick={handleFormSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
FilterDrawer.propTypes = {
  handleCloseFilter: PropTypes.func.isRequired,
  filterItems: PropTypes.array.isRequired,
  handleSubmitFilter: PropTypes.func,
};
export default FilterDrawer;
