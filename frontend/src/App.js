import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/main/Main';
import RequireAuth from './pages/main/RequireAuth';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import PageNotFound from './pages/error/PageNotFound';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<RequireAuth><Main /></RequireAuth>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
