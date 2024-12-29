import { useEffect, useMemo, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import Button from 'shared/components/button';
import { usePagination } from 'shared/components/context/pagination/pagination-provider';
import useDebounce from 'shared/components/hooks/use-debounce';
import DynamicTable from 'shared/components/table';
import { getSubscriptions } from 'src/shared/services/subscriptionService';
import { toastMessage } from '../../toast';
import { useNavigate } from 'react-router-dom';
export default function InisightList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const { pagination, setPagination } = usePagination();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'name',
      },
      {
        Header: 'Package Name',
        accessor: 'package',
      },
      {
        Header: 'Package Price',
        accessor: 'price',
      },
      {
        Header: 'Expire Date',
        accessor: 'exire_date',
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
          </div>
        ),
      },
    ],
    []
  );
  const fetchSubscription = () => {
    getSubscriptions(pagination.currentPage, searchTerm)
      .then(({ data: { data } }) => {
        setSubscriptions(data.data);
        setPagination({
          currentPage: data.current_page,
          lastPage: data.last_page,
        });
      })
      .catch((err) => {
        toastMessage('error', err.response.data.message);
      });
  };

  useEffect(() => {
    fetchSubscription();
  }, [pagination?.currentPage, searchValue]);

  const data = useMemo(() => {
    return subscriptions?.map((subscription) => ({
      id: subscription.id,
      name: subscription?.user?.name,
      package: subscription?.package?.name,
      price: subscription?.package?.price,
      exire_date: subscription?.expire_date,
    }));
  }, [subscriptions]);

  const handleShowClick = (param) => {
    navigate(`/subscriptions/detail/${param}`);
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

  return (
    <>
      <DynamicTable
        columns={columns}
        data={data}
        handleSearch={handleSearch}
        // filterItems={filterItems}
        // handleSubmitFilter={handleSubmitFilter}
      />
    </>
  );
}
