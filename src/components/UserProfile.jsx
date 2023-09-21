import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import logOut from '../assets/logOut.svg';
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  const User = localStorage.getItem('member') !== 'undefined' ? JSON.parse(localStorage.getItem('member')) : localStorage.clear();

  useEffect(() => {
    // console.log(userId)
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative h-full items-center justify-center pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative mb-7 flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <img
              className=" h-370 w-full object-cover shadow-lg 2xl:h-510"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="-mt-10 h-20 w-20 rounded-full object-cover shadow-xl"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="mt-3 text-center text-3xl font-bold">
            {user.userName}
          </h1>
          <div className="z-1 absolute right-0 top-0 p-2">
            {userId === User._id && (
              <button
                type="button"
                className=" cursor-pointer rounded-full bg-white p-2 shadow-md outline-none"
                onClick={logout}
                // disabled={renderProps.disabled}
              >
                {/* <AiOutlineLogout color="red" fontSize={21} /> */}
                <img src={logOut} alt="logOut" className="w-8" />
              </button>
            )}
          </div>
        </div>
        <div className="mb-7 text-center">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="text-1xl mt-2 flex w-full items-center justify-center font-bold">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;