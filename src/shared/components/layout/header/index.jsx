import { FaBell, FaAlignJustify } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from 'shared/services/authService';
import { resetUser } from 'src/shared/redux/reducers/userSlice';
import { toastMessage } from '../../toast';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from 'shared/routes/routeConstants';

const Header = () => {
  const dispatch = useDispatch();
  const {
    user: { user },
  } = useSelector((state) => state.root);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const userLogout = () => {
    Logout()
      .then(() => {
        navigate(routeConstant.login.path);
        dispatch(resetUser());
        localStorage.clear();
        toastMessage('success', 'Logout successfully');
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  return (
    <header className="bg-white shadow-md flex justify-between items-center p-4 md:p-2 sticky top-0 z-50">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <h1 className="ml-2 text-black text-2xl font-semibold hidden md:block">
            Glampions
          </h1>
        </div>
        {/* <div className="md:ml-24">
          <button
            id="toggleButton"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <FaAlignJustify size={24} color="black" />
          </button>
        </div> */}
      </div>

      <div className="relative md:mr-10">
        <div className="flex flex-col items-center">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <img
              src="https://picsum.photos/200/300"
              alt="profile"
              className="rounded-full w-12 h-12 object-cover overflow-hidden border-2 border-gray-300"
            />

            <span className="text-black text-md font-semibold mt-4">
              {user?.name}
            </span>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4">
            {/* User settings dropdown content */}
            <ul>
              <li className="mt-1 mb-1">
                <Link
                  to="/setting"
                  onClick={toggleDropdown}
                  className="cursor-pointer hover:bg-gray-200 py-1 px-2 rounded"
                >
                  Settings
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  onClick={userLogout}
                  className="cursor-pointer hover:bg-gray-200 py-1 px-2 rounded"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
