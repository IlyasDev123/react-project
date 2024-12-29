import { useSelector } from 'react-redux';

const FilterItemList = (handleCategoryChange, handleStatusChange) => {
  const { categories } = useSelector((state) => state.root);

  const filters = {
    category: {
      id: 2,
      title: 'Category',
      type: 'select',
      placeholder: 'Select Category',
      options: categories.map((category) => ({
        id: category.id,
        value: category.id,
        label: category.name,
      })),
      onChange: (e) => handleCategoryChange(e.value),
    },
    status: {
      id: 2,
      title: 'Status',
      type: 'select',
      placeholder: 'Select Status Type',
      options: [
        { id: 1, value: true, label: 'Active' },
        { id: 2, value: false, label: 'Deactive' },
      ],
      onChange: (e) => handleStatusChange(e.value),
    },
  };

  return { filters };
};

export default FilterItemList;
