import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.root);

  return (
    <div className="bg-white rounded-lg shadow-md max-w-md p-10">
      <img
        src="https://picsum.photos/200/300"
        alt="profile"
        className="rounded-full w-32 h-32 mx-auto mb-4"
      />
      <div className="text-center">
        <h1 className="text-2xl font-bold">{user?.user?.name}</h1>
        <p className="text-gray-600">{user?.user?.email}</p>
      </div>
    </div>
  );
}

export default Profile;
