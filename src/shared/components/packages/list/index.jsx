import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from 'shared/components/table';
import {
  deletePackage,
  getPackages,
  updateStatus,
} from 'src/shared/services/packageService';
import { toastMessage } from '../../toast';
import Button from 'shared/components/button';
import Toggle from 'shared/components/form/toggle';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { routeConstant } from 'shared/routes/routeConstants';
import useDebounce from 'shared/components/hooks/use-debounce';
import Modal from 'shared/components/modal';

export default function PackageList() {
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Duration',
        accessor: 'duration',
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

  const getPackagesList = () => {
    getPackages(1, searchTerm)
      .then(({ data: { data } }) => {
        setPackages(data.data);
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  useEffect(() => {
    getPackagesList();
  }, [searchValue]);

  const data = useMemo(() => {
    return packages?.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      duration: item.duration,
      status: item.is_active === 1 ? true : false,
    }));
  }, [packages]);

  const handleEditClick = (param) => {
    navigate(routeConstant.editPackage.path.replace(':id', param));
  };

  const handleDeleteClick = ($param) => {
    setPackageId($param);
    setShowModal(true);
  };

  const handleShowClick = (param) => {
    navigate(routeConstant.detailPackage.path.replace(':id', param));
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

  const confirmDeletePackage = () => {
    setIsDisabled(true);
    deletePackage(packageId)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        setPackages(packages.filter((pack) => pack.id !== packageId));
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
    console.log('data console', data);
    const { id, status } = data;

    const payload = {
      id: id,
      is_active: !status,
    };
    updateStatus(payload)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        getPackagesList();
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
          navigate(routeConstant.addPackage.path);
        }}
        handleSearch={handleSearch}
      />

      <Modal
        showModal={showModal}
        closeModal={handleCloseModal}
        title="Delete Package"
        content="Are you sure you want to delete this Package?"
        buttonText="Delete"
        buttonClass="bg-red-500 hover:bg-red-700 text-white rounded-lg"
        buttonClick={confirmDeletePackage}
        isDisabled={isDisabled}
      />
    </>
  );
}
