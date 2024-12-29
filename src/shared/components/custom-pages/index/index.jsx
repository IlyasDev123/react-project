import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from 'shared/components/table/sortable';

import { toastMessage } from 'shared/components/toast';
import Button from 'shared/components/button';
import { FaEdit } from 'react-icons/fa';
import { getPage } from 'src/shared/services/pageService';
import { routeConstant } from 'src/shared/routes/routeConstants';
export default function InisightList() {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
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
          </div>
        ),
      },
    ],
    []
  );
  const getCustomePages = () => {
    getPage()
      .then(({ data: { data } }) => {
        console.log(data);
        setPages(data);
      })
      .catch((err) => {
        toastMessage('error', err.response.data.message);
      });
  };

  useEffect(() => {
    getCustomePages();
  }, []);

  const data = useMemo(() => {
    return pages?.map((page) => ({
      id: page.id,
      name: page.title,
      type: page.type,
    }));
  }, [pages]);

  const handleEditClick = (param) => {
    navigate(routeConstant.updatePages.path.replace(':id', param.id));
  };

  return (
    <>
      <DynamicTable columns={columns} data={data} />
    </>
  );
}
