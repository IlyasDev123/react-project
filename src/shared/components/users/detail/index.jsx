import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetail } from 'shared/services/userService'; // Your API service
import { toastMessage } from '../../toast';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    getUserDetail(id)
      .then(({ data: { data } }) => {
        setUser(data);
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
            className="w-32 h-32 p-1 object-cover rounded-full ring-2"
            src={user?.avatar}
            alt={user?.name}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-10 shadow-gray-300 translate-x-3">
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Name:</h2>
            <p className="text-lg px-2">{user?.name}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">email:</h2>
            <p className="text-lg px-2">{user?.email}</p>
          </div>

          <div className="flex-grow">
            <h2 className="text-xl mb-1">Status:</h2>
            <p
              className={`text-lg px-2 ${
                user?.status === 1 ? 'text-green-500' : 'text-red-700'
              }`}
            >
              {user?.status === 1 ? 'Active' : 'Deactive'}
            </p>
          </div>

          <div className="flex-grow">
            <h2 className="text-xl mb-1">Total Workouts:</h2>
            <p className="text-lg px-2">{user?.user_workouts_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
