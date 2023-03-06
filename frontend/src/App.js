import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from "react";

const api = axios.create({
  baseURL: process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === 'production' ? 
    process.env.REACT_APP_REMOTE_API_URL : process.env.REACT_APP_LOCAL_API_URL,
});

function App() {
  console.log("REACT_APP_ENV=".concat(process.env.REACT_APP_ENV));

  const [person, setPerson] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      const request = await api.get('/');
      setPerson(request.data);
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi, I am <code>{person.name}</code>. I am <code>{person.age}</code> years old.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
