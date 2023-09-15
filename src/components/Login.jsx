import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { hashID } from "../utils/data";

const Login = () => {
  const navigate = useNavigate();
  const users = ["SELECT USER", "Rong", "Nghe", "In", "Unaunin", "TLC", "stranger!"]
  const [user, setUser] = useState("SELECT USER")
  let [pW, setPw] = useState('')
  const [vaultObj, setVaultObj] = useState({})
  // const [loggedIn, setLoggedIn] = useState(false)

  const RongPw = import.meta.env.VITE_RONG_PW
  const NghePw = import.meta.env.VITE_NGHE_PW
  const InPw = import.meta.env.VITE_IN_PW
  const MaiPw = import.meta.env.VITE_UNAUNIN_PW
  const TLCPw = import.meta.env.VITE_TLC_PW
  const vault = [null, RongPw, NghePw, InPw, MaiPw, TLCPw,]


  useEffect(() => {
    const obj = users.reduce((accumulator, user, index) => {
      return { ...accumulator, [user]: vault[index] };
    }, {});
    console.log(obj)
    setVaultObj(obj);
    setPw("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const Add = users.map(Add => Add)
  const handleUserChange = (e) => {
    const activeUser = (users[e.target.value])
    console.log(activeUser)
    setPw('abc')
    setUser(activeUser)
  }
  const handlePwChange = (e) => {
    e.preventDefault
    setPw(e.target.value)
    console.log("PASWORD REVEALED***", pW)
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
    console.log("login is clicked")
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

    <div className="w-full h-screen font-sans bg-cover bg-no-repeat bg-loginBG opacity-50">
      <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
          {/* <div className="leading-loose"> */}
            <form className="max-w-sm p-6 mx-2 rounded-xl shadow-xl bg-teal-400 bg-gradient-to-l md:bg-gradient-to-r">
              <p className="mb-8 text-2xl font-bold text-center text-white">
                Welcome to Memories
              </p>
              <div className="mb-2">

                <label className="text-gray-900" htmlFor="users">
                  <select id="users" className="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="users"
                    onChange={e => handleUserChange(e)}>
                    {
                      Add.map((address, key) => <option key={key} value={key}>{address}</option>)
                    }
                  </select>
                </label>

              </div>
              <div className="mb-2">
                <div className=" relative ">
                  <input type="password" id="login-with-bg-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="*********"
                    disabled={user == "SELECT USER"}
                    onChange={handlePwChange} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  onClick={handlelogin}>
                  Login
                </button>
              </div>
            </form>
          {/* </div> */}
        </div>
      </div>
    </div>

  )
}

export default Login