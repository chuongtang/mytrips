/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import plus from "../assets/plus.svg";
import search from "../assets/search.svg";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    console.log(user)
    return (
      <div className="mt-5 flex w-full gap-2 pb-7 md:gap-5">
        <div className="flex w-full items-center justify-start rounded-xl border-none bg-gradient-to-r from-indigo-200 from-10% via-sky-500 via-30% to-emerald-200 to-90% bg-top px-2 outline-none focus-within:shadow-sm">
          <img src={search} alt="search button" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            className="w-full rounded-lg bg-gray-100 p-2 outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.image}
              alt="user-pic"
              className="h-12 w-14 rounded-lg "
            />
          </Link>
          <Link
            to="/create-pin"
            className="flex h-12 w-12 items-center justify-center rounded-lg text-white md:h-12 md:w-14"
          >
            <img src={plus} alt="add button" />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;