import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSubscriptionById } from 'shared/services/subscriptionService'; // Your API service
import { toastMessage } from '../../toast';

const InsightDetail = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    getSubscriptionById(id)
      .then(({ data: { data } }) => {
        setSubscription(data);
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
        <div className="flex flex-col sm:flex-row gap-10 shadow-gray-300 translate-x-3">
          <div className="flex-grow">
            <h2 className="text-xl mb-1">User Name:</h2>
            <p className="text-lg px-2">{subscription?.user?.name}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Package Name:</h2>
            <p className="text-lg px-2">{subscription?.package?.name}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Price:</h2>
            <p className="text-lg px-2">{subscription?.package?.price}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Expire Date:</h2>
            <p className="text-lg px-2">{subscription?.expire_date}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Status:</h2>
            <p
              className={`text-lg px-2 ${
                subscription?.is_active ? 'text-green-500' : 'text-red-700'
              }`}
            >
              {subscription?.is_active ? 'Active' : 'Deactive'}
            </p>
          </div>
        </div>
        <div className="mb-1">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Package Name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Price</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Purchase Date</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Expire Date</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {subscription?.user_subscription_history &&
                subscription?.user_subscription_history.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:border-white-700"
                  >
                    <td className="px-6 py-4">{item?.package?.name}</td>
                    <td className="px-6 py-4">{item?.package?.price}</td>
                    <td className="px-6 py-4">{item.created_at}</td>
                    <td className="px-6 py-4">{item.expire_date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsightDetail;
