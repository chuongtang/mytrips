import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { hashID } from "../utils/data";
// import feedUsers from "../utils/FeedData";

const Login = () => {
  const navigate = useNavigate();
  const users = ["SELECT USER", "Rong", "Nghe", "In", "Unaunin", "TLC","Queenie"]
  const [user, setUser] = useState("SELECT USER")
  let [pW, setPw] = useState('')
  const [vaultObj, setVaultObj] = useState({})
  // const [loggedIn, setLoggedIn] = useState(false)

  const RongPw = import.meta.env.VITE_RONG_PW
  const NghePw = import.meta.env.VITE_NGHE_PW
  const InPw = import.meta.env.VITE_IN_PW
  const MaiPw = import.meta.env.VITE_UNAUNIN_PW
  const TLCPw = import.meta.env.VITE_TLC_PW
  const QueeniePw = import.meta.env.VITE_QUEENIE_PW
  const vault = [null, RongPw, NghePw, InPw, MaiPw, TLCPw, QueeniePw,];


  useEffect(() => {
    const obj = users.reduce((accumulator, user, index) => {
      return { ...accumulator, [user]: vault[index] };
    }, {});
    // feedUsers();  //⬅️ to be run when adding new user
    //  console.log(obj)
    setVaultObj(obj);
    setPw("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const Add = users.map(Add => Add)
  const handleUserChange = (e) => {
    const activeUser = (users[e.target.value])
    // console.log(activeUser)
    setPw('view')
    setUser(activeUser)
  }
  const handlePwChange = (e) => {
    e.preventDefault
    setPw(e.target.value)
    // console.log("PASWORD REVEALED***", pW)
  }

  const handleLocalStorage = (key, value) => {
    const now = new Date()
    const item = {
      _id: hashID(user),
      value: value,
      expiry: now.getTime() + 9000000, //150 mins
    }
    localStorage.setItem(key, JSON.stringify(item))
  }
  const handlelogin = event => {
    event.preventDefault();
    // console.log("login is clicked")
    const key = Object.values(vaultObj)[Object.keys(vaultObj).indexOf(user)];
    if (pW === key) {
      // setLoggedIn(true)
      handleLocalStorage("member", user)
      navigate('/', { replace: true });
    } else {
      alert("Try again! You must be sleepy 😴 !")
    }
  }
  return (
    <div className="h-screen w-full bg-loginBG bg-cover bg-no-repeat font-sans opacity-50">
      <div className="container mx-auto flex h-full flex-1 items-center justify-center">
        <div className="w-full max-w-lg">
          {/* <div className="leading-loose"> */}
          <form className="mx-2 max-w-sm rounded-xl bg-teal-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 shadow-xl md:bg-gradient-to-r">
            <p className="mb-8 text-center text-2xl font-bold text-white">
              Welcome to MyTrips❤️
            </p>
            <div className="mb-2">
              <label className="text-gray-900" htmlFor="users">
                <select
                  id="users"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-52 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none"
                  name="users"
                  onChange={(e) => handleUserChange(e)}
                >
                  {Add.map((address, key) => (
                    <option key={key} value={key}>
                      {address}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mb-2">
              <div className=" relative ">
                <input
                  type="password"
                  id="login-with-bg-password"
                  className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 border-transparent bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="*********"
                  disabled={user == "SELECT USER"}
                  onChange={handlePwChange}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2  text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200"
                onClick={handlelogin}
              >
                Login
              </button>
            </div>
            <p className="mt-2 text-xs">
              or send a login request to "email@chuongtang.com"
            </p>
          </form>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login