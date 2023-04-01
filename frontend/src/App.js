// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import PageNotFound from './pages/error/PageNotFound';
import RecipesPop from './pages/main/recipesingredients/RecipesPop';



// const api = axios.create({
//   baseURL: process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'production' ? 
//     process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL,
// });
//don't change 3lines above

function App() {
  // console.log("REACT_APP_ENV=".concat(process.env.REACT_APP_ENV));
  // const [person, setPerson] = React.useState({});
  // React.useEffect(() => {
  //   async function fetchData() {
  //     const request = await api.get('/');
  //     setPerson(request.data);
  //     return request;
  //   }
  //   fetchData();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Recipepop" element={<RecipesPop />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Hi, I am <code>{person.name}</code>. I am <code>{person.age}</code> years old.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
