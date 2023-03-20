import React from "react";
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function Login() {
  return (
    <div>
      <Navbar />
      <Home />
      <Outlet />
    </div>
  )
}

export default Login;
