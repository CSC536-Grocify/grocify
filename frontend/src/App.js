import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/main/Main';
import ProtectedRoutes from './pages/main/ProtectedRoutes';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import PageNotFound from './pages/error/PageNotFound';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoutes />}>
          <Route path="main" element={<Main />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
