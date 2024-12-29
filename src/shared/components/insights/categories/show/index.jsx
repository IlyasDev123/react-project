import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInsightById } from 'shared/services/insightService'; // Your API service
import { toastMessage } from '../../toast';

const InsightDetail = () => {
  const { id } = useParams();
  const [insight, setInsight] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    getInsightById(id)
      .then(({ data: { data } }) => {
        setInsight(data);
        setIsLoding(false);
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoding(false);
      });
  }, [id]);

  if (isLoding) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="bg-white rounded-lg shadow-lg sm:p-6 p-10 grid grid-cols-1 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={insight?.thumbnail}
            alt="Insight Thumbnail"
            className="w-full h-64 object-contain"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-10 shadow-gray-300 translate-x-3">
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Title:</h2>
            <p className="text-lg px-2">{insight?.title}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Category:</h2>
            <p className="text-lg px-2">{insight?.category?.name}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Views:</h2>
            <p className="text-lg px-2">{insight?.views}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Status:</h2>
            <p
              className={`text-lg px-2 ${
                insight?.status === 1 ? 'text-green-500' : 'text-red-700'
              }`}
            >
              {insight?.status === 1 ? 'Active' : 'Deactive'}
            </p>
          </div>
        </div>
        <div className="mb-1">
          <h2 className="text-xl font-bold">Short Description:</h2>
          <p className="text-lg px-2">{insight?.short_description}</p>

          <h2 className="text-xl mb-1 mt-2 font-bold">Description:</h2>
          <p
            className="text-lg px-2"
            dangerouslySetInnerHTML={{ __html: insight?.description }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default InsightDetail;
