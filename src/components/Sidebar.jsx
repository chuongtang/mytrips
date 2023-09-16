import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import home from '../assets/home.svg';
import rightArrow from '../assets/rightArrow.svg';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="hide-scrollbar flex h-full min-w-210 flex-col justify-between overflow-y-scroll bg-white">
      <div className="flex flex-col">
        <Link
          to="/"
          className="my-6 flex w-190 items-center gap-2 px-5 pt-1"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full animate-pulse" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <img src={home} alt="home icon" className="h-10" />
            <p className="text-teal-800">Home</p>
          </NavLink>
          <h3 className="mt-2 animate-bounce px-5 text-base text-gray-600 2xl:text-xl">
            Memories from places
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="h-8 w-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="mx-3 my-5 mb-3 flex items-center gap-2 rounded-lg bg-red-50 p-2 shadow-xl"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="h-10 w-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <img src={rightArrow} alt="rightArrow icon" className="h-8" />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;