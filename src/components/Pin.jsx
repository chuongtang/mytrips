
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import download from '../assets/download.svg'
import delBtn from '../assets/delBtn.svg'
import openLink from '../assets/openLink.svg'
import { client, urlFor } from '../client';

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = pin;
  

  const user = localStorage.getItem('member') !== 'undefined' ? JSON.parse(localStorage.getItem('member')) : localStorage.clear();
  console.log("PINNN here", user);
  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?._id);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?._id,
          postedBy: {
            _type: 'postedBy',
            _ref: user?._id,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg"
      >
        {image && (
          <img
            className="w-full rounded-lg "
            src={urlFor(image).width(250).url()}
            alt="user-post"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 z-50 flex h-full w-full flex-col justify-between p-1 pb-2 pr-2 pt-2"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-dark flex h-9 w-9 items-center justify-center rounded-full bg-white p-2 text-xl opacity-75 outline-none hover:opacity-100 hover:shadow-md"
                >
                  <img src={download} alt="download icon" className="h-8" />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="rounded-3xl bg-red-500 px-5 py-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="rounded-3xl bg-gray-400 p-1 text-base font-bold text-white opacity-70 outline-none hover:opacity-100 hover:shadow-md"
                >
                  {pin?.save?.length} {savingPost ? "Saving" : "👍"}
                </button>
              )}
            </div>
            <div className=" flex w-full items-center justify-between gap-2">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-white p-2 font-bold text-black opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {" "}
                  <img src={openLink} alt="openLink icon" className="h-6" />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {postedBy?._id === user?._id && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="text-dark flex h-8 w-8 items-center justify-center rounded-full bg-white p-2 opacity-75 outline-none hover:opacity-100"
                >
                  <img src={delBtn} alt="delBtn icon" className="h-8" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="mt-2 flex items-center gap-2"
      >
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;