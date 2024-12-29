import { useEffect, useMemo, useState } from 'react';
import { usePagination } from 'shared/components/context/pagination/pagination-provider';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/components/button';
import Toggle from 'shared/components/form/toggle';
import Modal from 'shared/components/modal';
import DynamicTable from 'shared/components/table';
import { toastMessage } from 'shared/components/toast';
import { routeConstant } from 'shared/routes/routeConstants';
import { getWorkoutCategories } from 'shared/services/categoryService';
import FilterItemList from './filter-items';

import {
  deleteWorkout,
  getWorkouts,
  updateFeatureStatus,
  updateStatus,
} from 'shared/services/workoutService';
import { setCategories } from 'src/shared/redux/reducers/categorySlice';
import useDebounce from 'shared/components/hooks/use-debounce';

function Workout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pagination, setPagination } = usePagination();
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [workoutId, setWorkoutId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const { filters } = FilterItemList(handleCategoryChange, handleStatusChange);
  const filterItems = [filters.category, filters.status];

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'name',
      },
      {
        Header: 'Category',
        accessor: 'category.name',
      },
      {
        Header: 'Thumbnail',
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.PlayerImageURL}
            width={80}
            alt="Player"
          />
        ),
      },
      {
        Header: 'Feature',
        accessor: 'is_featured',
        Cell: (tableProps) => (
          <Toggle
            name="is_featured"
            onChange={() => {
              onHandleChangeFeature(tableProps.row.original);
            }}
            checked={tableProps.row.original.is_featured}
          />
        ),
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
              customClass="bg-blue-500 hover:bg-blue-700 text-white"
              onClick={() => handleShowClick(tableProps.row.original.id)}
            >
              <FaEye color="white" className="m-2" />
            </Button>
            <Button
              customClass="bg-green-500 hover:bg-green-700"
              onClick={() => handleEditClick(tableProps.row.original.id)}
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

  const data = useMemo(() => {
    return workouts?.map((workout) => ({
      id: workout.id,
      name: workout.title,
      description: workout.description,
      category: workout.category,
      PlayerImageURL: workout?.video?.thumbnail,
      is_featured: workout.is_featured,
      is_premium: workout.is_premium,
      status: workout.status === 1 ? true : false,
    }));
  }, [workouts]);

  const onHandleChangeFeature = (data) => {
    const { id, is_featured } = data;
    const payload = {
      id: id,
      is_featured: !is_featured,
    };
    updateFeatureStatus(payload)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        fetchWorkouts();
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data?.message);
      });
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
        fetchWorkouts();
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  const fetchCategories = () => {
    getWorkoutCategories()
      .then(({ data: { data } }) => {
        dispatch(setCategories(data));
      })
      .catch((err) => {
        toastMessage('error', err.response.data.message);
      });
  };

  const fetchWorkouts = (param = null) => {
    getWorkouts(pagination.currentPage, searchTerm, param)
      .then(({ data: { data } }) => {
        setWorkouts(data.data);
        setPagination({
          currentPage: data?.current_page,
          lastPage: data?.last_page,
        });
      })
      .catch((err) => {
        console.log(err);
        toastMessage('error', err && err.response);
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, [pagination?.currentPage, searchValue]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditClick = (param) => {
    navigate(routeConstant.editWorkout.path.replace(':id', param));
  };

  const handleDeleteClick = ($param) => {
    setWorkoutId($param);
    setShowModal(true);
  };

  const handleShowClick = (param) => {
    navigate(routeConstant.detailWorkout.path.replace(':id', param));
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const confirmDeleteWorkout = () => {
    setIsDisabled(true);
    deleteWorkout(workoutId)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      })
      .finally(() => {
        setIsDisabled(false);
      });
    setShowModal(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitFilter = (formData) => {
    fetchWorkouts(formData);
  };

  useDebounce(
    () => {
      setSearchValue(searchTerm);
    },
    [searchTerm],
    800
  );

  return (
    <>
      <DynamicTable
        columns={columns}
        data={data}
        handleSearch={handleSearch}
        filterItems={filterItems}
        handleSubmitFilter={handleSubmitFilter}
        handleAddForm={() => {
          navigate(routeConstant.addWorkout.path);
        }}
      />
      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        title="Delete Workout"
        content="Are you sure you want to delete this Workout?"
        buttonText="Delete"
        buttonClass="bg-red-500 hover:bg-red-700 text-white rounded-lg"
        buttonClick={confirmDeleteWorkout}
        isDisabled={isDisabled}
      />
    </>
  );
}

export default Workout;
