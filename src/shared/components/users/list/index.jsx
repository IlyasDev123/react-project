import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from 'shared/components/table';
import { getUsers, updateStatus } from 'src/shared/services/userService';
import { toastMessage } from '../../toast';
import Button from 'shared/components/button';
import Toggle from 'shared/components/form/toggle';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { routeConstant } from 'shared/routes/routeConstants';
import { usePagination } from 'shared/components/context/pagination/pagination-provider';
import useDebounce from 'shared/components/hooks/use-debounce';
// import Modal from 'shared/components/modal';
// import { deleteInsight, updateStatus } from 'shared/services/insightService';
export default function Users() {
  const [users, setUsers] = useState([]);
  // const [userId, setUserId] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const { pagination, setPagination } = usePagination();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  // const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: 'Avatr',
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.PlayerImageURL}
            width={80}
            alt="Player"
            className="w-14 h-14 p-1 object-cover rounded-full ring-2"
          />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },

      {
        Header: 'Type',
        accessor: 'is_premium',
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
            {/* <Button
              customClass="bg-red-500 hover:bg-red-700"
              onClick={() => handleDeleteClick(tableProps.row.original.id)}
            >
              <FaTrashAlt color="white" className="m-2" />
            </Button> */}
          </div>
        ),
      },
    ],
    []
  );

  const getUserList = () => {
    getUsers(pagination.currentPage, searchTerm)
      .then(({ data: { data } }) => {
        setUsers(data.data);
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
    getUserList();
  }, [pagination?.currentPage, searchValue]);

  const data = useMemo(() => {
    return users?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      PlayerImageURL: user?.avatar,
      status: user.status === 1 ? true : false,
      is_premium: user.is_premium === 1 ? 'Premium' : 'Free',
    }));
  }, [users]);

  // const handleDeleteClick = ($param) => {
  //   setUserId($param);
  //   setShowModal(true);
  // };

  const handleShowClick = (param) => {
    navigate(routeConstant.userDetail.path.replace(':id', param));
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

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // const confirmDeleteUsers = () => {
  //   setIsDisabled(true);
  //   deleteInsight(userId)
  //     .then(({ data: { message } }) => {
  //       toastMessage('success', message);
  //       setUsers(userId.filter((user) => user.id !== userId));
  //     })
  //     .catch(() => {
  //       toastMessage('error', 'Something went wrong');
  //     })
  //     .finally(() => {
  //       setIsDisabled(false);
  //     });
  //   setShowModal(false);
  // };

  const onHandleChangeStatus = (data) => {
    const { id, status } = data;
    const payload = {
      user_id: id,
      status: !status,
    };

    updateStatus(payload)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        getUserList();
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
        handleSearch={handleSearch}
        // filterItems={filterItems}
        // handleSubmitFilter={handleSubmitFilter}
      />
      {/* 
      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        title="Delete User"
        content="Are you sure you want to delete this User?"
        buttonText="Delete"
        buttonClass="bg-red-500 hover:bg-red-700 text-white rounded-lg"
        buttonClick={confirmDeleteUsers}
        isDisabled={isDisabled}
      /> */}
    </>
  );
}
