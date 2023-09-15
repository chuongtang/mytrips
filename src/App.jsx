import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import feedUsers from './utils/FeedData';
import { Login } from './components';
import Home from './container/Home';

const App = () => {
  const navigate = useNavigate();

  const checkWithExpiry = (key)=> {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  useEffect(() => {
    //⬇⚠️⚠️⚠️activate to add user with useEffect then insert into array and .env
    // feedUsers()    
    const User = localStorage.getItem('member') !== 'undefined' ? JSON.parse(localStorage.getItem('member')) : localStorage.clear();
   
    checkWithExpiry("member")

    !User && navigate('/login');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    
  );
};

export default App;