import React, { useState } from 'react';

function LoginPopup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin() {
    // TODO: Implement your login logic here
    console.log(`Username: ${username}, Password: ${password}`);
  }
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="button" onClick={handleLogin}>
            Sign In
            </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
