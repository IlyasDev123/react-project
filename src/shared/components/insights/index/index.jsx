import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from 'shared/components/table';
import { useDispatch } from 'react-redux';
import { getInsight } from 'src/shared/services/insightService';
import { toastMessage } from '../../toast';
import Button from 'shared/components/button';
import Toggle from 'shared/components/form/toggle';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { routeConstant } from 'shared/routes/routeConstants';
import { usePagination } from 'shared/components/context/pagination/pagination-provider';
import useDebounce from 'shared/components/hooks/use-debounce';
import Modal from 'shared/components/modal';
import { deleteInsight, updateStatus } from 'shared/services/insightService';
import { setInsightCategories } from 'src/shared/redux/reducers/insightCategorySlice';
import { getInsightCategories } from 'shared/services/categoryService';
export default function InisightList() {
  const [insights, setInsights] = useState([]);
  const [insightId, setInsightId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { pagination, setPagination } = usePagination();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
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

  const getInsightList = () => {
    getInsight(pagination.currentPage, searchTerm)
      .then(({ data: { data } }) => {
        setInsights(data.data);
        setPagination({
          currentPage: data?.current_page,
          lastPage: data?.last_page,
        });
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  useEffect(() => {
    getInsightList();
  }, [pagination?.currentPage, searchValue]);

  const data = useMemo(() => {
    return insights?.map((insight) => ({
      id: insight.id,
      slug: insight.slug,
      name: insight.title,
      description: insight.description,
      category: insight.category,
      PlayerImageURL: insight?.thumbnail,
      is_featured: insight.is_featured,
      status: insight.status === 1 ? true : false,
    }));
  }, [insights]);

  const handleEditClick = (param) => {
    navigate(routeConstant.updateInsight.path.replace(':id', param));
  };

  const handleDeleteClick = ($param) => {
    setInsightId($param);
    setShowModal(true);
  };

  const handleShowClick = (param) => {
    navigate(routeConstant.detailInsight.path.replace(':id', param));
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
    setShowModal(false);
  };

  const confirmDeleteInsight = () => {
    setIsDisabled(true);
    deleteInsight(insightId)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        setInsights(insights.filter((insight) => insight.id !== insightId));
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
        getInsightList();
      })
      .catch((err) => {
        toastMessage('error', err?.response?.data?.message);
      });
  };

  const fetchCategories = () => {
    getInsightCategories(searchTerm)
      .then(({ data: { data } }) => {
        dispatch(setInsightCategories(data));
        console.log(data);
      })
      .catch((err) => {
        toastMessage('error', err.response.data.message);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <DynamicTable
        columns={columns}
        data={data}
        handleAddForm={() => {
          navigate(routeConstant.addInsight.path);
        }}
        handleSearch={handleSearch}
        // filterItems={filterItems}
        // handleSubmitFilter={handleSubmitFilter}
      />

      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        title="Delete Insight"
        content="Are you sure you want to delete this Insight?"
        buttonText="Delete"
        buttonClass="bg-red-500 hover:bg-red-700 text-white rounded-lg"
        buttonClick={confirmDeleteInsight}
        isDisabled={isDisabled}
      />
    </>
  );
}
