import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React from "react";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function App() {
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
