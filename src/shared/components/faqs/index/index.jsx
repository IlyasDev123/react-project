import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicTable from 'shared/components/table/sortable';
import useDebounce from 'shared/components/hooks/use-debounce';
import { toastMessage } from 'shared/components/toast';
import Button from 'shared/components/button';
import { FaEdit } from 'react-icons/fa';
import { getFaqs, sortFaqs } from 'src/shared/services/faqService';
import { routeConstant } from 'src/shared/routes/routeConstants';
export default function InisightList() {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: 'Question',
        accessor: 'question',
      },
      {
        Header: 'Answer',
        accessor: 'answer',
        Cell: ({ row }) => {
          const stripHtmlAndLimitText = (html, limit) => {
            const tmp = document.createElement('DIV');
            tmp.innerHTML = html;
            let text = tmp.textContent || tmp.innerText || '';
            const words = text.split(' ');
            if (words.length > limit) {
              text = `${words.slice(0, limit).join(' ')}...`;
            }
            return text;
          };
          return <p>{stripHtmlAndLimitText(row.original.answer, 10)}</p>;
        },
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
  const getCustomefaqs = () => {
    getFaqs(searchTerm)
      .then(({ data: { data } }) => {
        setFaqs(data);
      })
      .catch((err) => {
        toastMessage('error', err.response.data.message);
      });
  };

  useEffect(() => {
    getCustomefaqs();
  }, [searchValue]);

  const data = useMemo(() => {
    return faqs?.map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    }));
  }, [faqs]);

  const handleEditClick = (param) => {
    navigate(routeConstant.updateFaq.path.replace(':id', param.id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useDebounce(
    () => {
      setSearchValue(searchTerm);
    },
    [searchTerm],
    500
  );

  const handleSort = (orders, $sourceIndex, destinationIndex) => {
    sortFaqs({
      sort_orders: orders,
      source_index: $sourceIndex,
      destination_index: destinationIndex,
    })
      .then(({ data }) => {
        getCustomefaqs();
        toastMessage('success', data?.message);
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
          navigate(routeConstant.addFaq.path);
        }}
        handleSearch={handleSearch}
        onDragSorted={handleSort}
      />
    </>
  );
}
