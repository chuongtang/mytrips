import { useState, useRef, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components'
import { userQuery } from '../utils/data';
import { client } from '../client';
import Pins from './Pins';
import logo from '../assets/logo.svg';
import hamMenu from '../assets/hamMenu.svg';
import closeBtn from '../assets/closeBtn.svg';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('member') !== 'undefined' ? JSON.parse(localStorage.getItem('member')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?._id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex h-screen flex-col bg-gray-50 transition-height duration-75 ease-out md:flex-row">
      <div className="hidden h-screen flex-initial md:flex">
        <Sidebar user={user && user} />
      </div>
      <div className="flex flex-row md:hidden">
        <div className="flex w-full flex-row items-center justify-between p-2 shadow-md">
          {/* <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          /> */}
          <img
            src={hamMenu}
            alt="Menu Icon"
            className="w-8 cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          {/* <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} /> */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user-pic"
              className="h-9 w-9 rounded-full "
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed z-10 h-screen w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md">
            <div className="absolute flex w-full items-center justify-end p-2">
              {/* <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              /> */}
              <img
                src={closeBtn}
                alt="close Button"
                className="w-8 cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="h-screen flex-1 overflow-y-scroll pb-2" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;