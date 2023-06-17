import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
var x=0;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  x++;
  console.log("count--->"+x);
  useEffect(() => {
    if (localStorage.getItem("loginStaus") === "1") 
    {
      setIsLoggedIn(true)
    }
  },
    [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("loginStaus", "1")
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginStaus");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
