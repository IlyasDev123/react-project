import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWorkoutById } from 'shared/services/workoutService'; // Your API service
import { toastMessage } from '../../toast';

const WorkoutDetail = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    getWorkoutById(id)
      .then(({ data: { data } }) => {
        setWorkout(data);
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
            <h2 className="text-xl mb-1">Title:</h2>
            <p className="text-lg px-2">{workout?.title}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Category:</h2>
            <p className="text-lg px-2">{workout?.category?.name}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Views:</h2>
            <p className="text-lg px-2">{workout?.views}</p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Status:</h2>
            <p
              className={`text-lg px-2 ${
                workout?.status === 1 ? 'text-green-500' : 'text-red-700'
              }`}
            >
              {workout?.status === 1 ? 'Active' : 'Deactive'}
            </p>
          </div>
          <div className="flex-grow">
            <h2 className="text-xl mb-1">Workout Type:</h2>
            <p className="text-lg px-2 text-blue-600">
              {workout?.is_featured ? 'Featured' : 'Premium'}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mb-1">Description:</h2>
          <p className="text-lg px-2">{workout?.description}</p>
        </div>
        <div className="flex justify-center items-center">
          <video src={workout?.video?.url} controls className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
