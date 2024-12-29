import { useEffect, useMemo, useState } from 'react';
import DynamicTable from 'shared/components/table/sortable';
import {
  deleteCategory,
  getInsightCategories,
  updateStatus,
  sortCategories,
} from 'src/shared/services/categoryService';
import { toastMessage } from 'shared/components/toast';
import Button from 'shared/components/button';
import Toggle from 'shared/components/form/toggle';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useDebounce from 'shared/components/hooks/use-debounce';
import Modal from 'shared/components/modal';
import AddCategory from '../add';
export default function InisightList() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },

      {
        Header: 'Status',
        accessor: 'status',
        Cell: (tableProps) => (
          <Toggle
            name="status"
            onChange={() => {
              onHandleChangeStatus(tableProps.row.original);
            }}
            checked={tableProps.row.original.status}
          />
        ),
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (tableProps) => (
          <div className="flex gap-2">
            <Button
              customClass="bg-green-500 hover:bg-green-700"
              onClick={() => handleEditClick(tableProps.row.original)}
            >
              <FaEdit color="white" className="m-2" />
            </Button>
            <Button
              customClass="bg-red-500 hover:bg-red-700"
              onClick={() => handleDeleteClick(tableProps.row.original.id)}
            >
              <FaTrashAlt color="white" className="m-2" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );
  const fetchCategories = () => {
    getInsightCategories(searchTerm)
      .then(({ data: { data } }) => {
        setCategories(data);
      })
      .catch((err) => {
        toastMessage('error', err.response.data.message);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, [searchValue]);

  const data = useMemo(() => {
    return categories?.map((category) => ({
      id: category.id,
      name: category.name,
      type: category.type,
      status: category.status,
    }));
  }, [categories]);

  const handleEditClick = (param) => {
    setCategory(param);
    setShowAddModal(true);
  };

  const handleDeleteClick = (param) => {
    setCategoryId(param);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useDebounce(
    () => {
      setSearchValue(searchTerm);
    },
    [searchTerm],
    800
  );

  const handleCloseModal = () => {
    setCategory(null);
    setShowAddModal(false);
    setShowModal(false);
  };

  const confirmDeleteCategory = () => {
    setIsDisabled(true);
    deleteCategory(categoryId)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      })
      .catch(() => {
        toastMessage('error', 'Something went wrong');
      })
      .finally(() => {
        setIsDisabled(false);
      });
    setShowModal(false);
  };

  const onHandleChangeStatus = (data) => {
    const { id, status } = data;
    const payload = {
      id: id,
      status: !status,
    };
    updateStatus(payload)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        fetchCategories();
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  const handleSort = (orders, $sourceIndex, destinationIndex) => {
    sortCategories({
      sort_orders: orders,
      source_index: $sourceIndex,
      destination_index: destinationIndex,
    })
      .then(() => {
        fetchCategories();
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  return (
    <>
      <DynamicTable
        columns={columns}
        data={data}
        handleAddForm={() => {
          setShowAddModal(true);
        }}
        handleSearch={handleSearch}
        onDragSorted={handleSort}
      />

      <AddCategory
        updateCategoryList={() => {
          fetchCategories();
        }}
        showAddModal={showAddModal}
        closeModal={handleCloseModal}
        category={category}
      />

      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        title="Delete Category"
        content="Are you sure you want to delete this Category?"
        buttonText="Delete"
        buttonClass="bg-red-500 hover:bg-red-700 text-white rounded-lg"
        buttonClick={confirmDeleteCategory}
        isDisabled={isDisabled}
      />
    </>
  );
}
