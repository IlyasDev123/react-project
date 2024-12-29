import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../icons';
import { sidebarItems } from './sidebarItems';

const Sidebar = () => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  const handleItemClick = (index) => {
    if (expandedMenu === index) {
      setExpandedMenu(null); // Collapse menu if already expanded
    } else {
      setExpandedMenu(index);
    }
  };
  return (
    <aside
      id="sidebar"
      className="bg-white text-black h-4/5 fixed top-30 mt-6 left-6 rounded mb-4 overflow-y-auto hidden md:block w-64"
    >
      <div className="px-10 pt-10 pl-4">
        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => handleItemClick(index)}
                className={`${
                  location.pathname.includes(item.path)
                    ? 'bg-blue-500 text-white'
                    : ''
                } group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-sm  duration-300 ease-in-out hover:bg-gray-200 hover:bg-meta-4 hover:text-gray-900 bg-graydark dark:bg-meta-4`}
              >
                <Icon
                  size={20}
                  color="gray-500"
                  FaIcon={item.icon}
                  className="ml-5"
                />
                {item.name}
              </Link>
              {item.submenu && expandedMenu === index && (
                <ul className="ml-4">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.path}
                        className={`
                        ${
                          location.pathname.includes(subItem.path)
                            ? 'bg-blue-500 text-white'
                            : ''
                        }
                        group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-sm  duration-300 ease-in-out hover:bg-gray-200 hover:text-white hover:bg-meta-4 bg-graydark dark:bg-meta-4`}
                      >
                        <Icon
                          size={15}
                          color="gray-500"
                          FaIcon={subItem.icon}
                          className="border rounded-full p-1 border-black"
                        />
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
