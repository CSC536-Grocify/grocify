import React from "react";
import Homelogin from './components/Home/Homelogin';
import Navbar from './components/Navbar/Navbar';

function LoginForm() {
  return (
    <div>
      <Navbar />
      <Homelogin />
      <Outlet />
    </div>
  )
}

export default LoginForm;