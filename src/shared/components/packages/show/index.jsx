import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPackageById } from 'shared/services/packageService'; // Your API service
import { toastMessage } from '../../toast';
import Loader from 'src/shared/loader';

const PackageDetail = () => {
  const { id } = useParams();
  const [packages, setPackages] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    getPackageById(id)
      .then(({ data: { data } }) => {
        setPackages(data);
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
  const description =
    packages?.description !== undefined
      ? JSON.parse(packages?.description)
      : [];
  return (
    <div className="container mx-auto mt-4">
      <div className="bg-white rounded-lg shadow-lg sm:p-6 p-10 grid grid-cols-1 gap-8">
        {isLoding ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-10 shadow-gray-300 translate-x-3">
              <div className="flex-grow">
                <h2 className="text-xl mb-1">Title:</h2>
                <p className="text-lg px-2">{packages?.name}</p>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl mb-1">Price:</h2>
                <p className="text-lg px-2">{packages?.price}</p>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl mb-1">Duration:</h2>
                <p className="text-lg px-2">{packages?.duration}</p>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl mb-1">Status:</h2>
                <p
                  className={`text-lg px-2 ${
                    packages?.is_active === 1
                      ? 'text-green-500'
                      : 'text-red-700'
                  }`}
                >
                  {packages?.is_active === 1 ? 'Active' : 'Deactive'}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl mb-1">Description:</h2>
              <ul className="list-disc text-lg px-2">
                {description?.map((itm, ind) => {
                  return (
                    <li key={ind} className="mb-2">
                      {itm}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageDetail;
