import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const SignupForm = (event) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  }

  const handlePopup = () => {
    const width = window.innerWidth * 0.25;
    const height = window.innerHeight / 4;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const popup = window.open(
      '',
      'loginPopup',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    popup.document.title = 'Log In';
    popup.document.body.style.backgroundColor = 'white';
    popup.document.body.style.display = 'flex';
    popup.document.body.style.justifyContent = 'center';
    popup.document.body.style.alignItems = 'center';
    popup.document.body.innerHTML = '<div id="login-form"></div>';

    const loginForm = (
      <LoginPopup
        onLogin={(data) => {
          setUsername(data.username);
          setPassword(data.password);
          popup.close();
          //u
        }}
      />
    );

    ReactDOM.render(loginForm, popup.document.getElementById('login-form'));
  };
  
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
      <div className="home-footer">
        <p>Already have an account? <a onClick={handlePopup}>Login</a></p>
      </div>
    </form>
  );
};

const LoginPopup = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin({ username, password });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default SignupForm;




// import React, { useState } from 'react';

// const SignupForm = (event) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   }

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here
//   }
//   const handleLogin = () => {
//     if (username === 'myusername' && password === 'mypassword') {
//       window.location.href = '/dashboard';
//     } else {
//       alert('Invalid username or password');
//     }
//   };
//   const handlePopup = () => {
//     const width = 400;
//     const height = 400;
//     const left = window.innerWidth / 2 - width / 2;
//     const top = window.innerHeight / 2 - height / 2;
//     const popup = window.open(
//       '/login',
//       'loginPopup',
//       `width=${width},height=${height},left=${left},top=${top}`
//     );
//     const receiveMessage = (event) => {
//       if (event.origin !== window.origin) {
//         return;
//       }

//       const { type, data } = event.data;

//       if (type === 'login') {
//         setUsername(data.username);
//         setPassword(data.password);
//         popup.close();
//       }
//     };

//     window.addEventListener('message', receiveMessage, false);
//   };
  
  

//   return (
//     <form className="signup-form" onSubmit={handleSubmit}>
//         <div>
//             <label htmlFor="username">Username:</label>
//              <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
//         </div>
//         <div>
//             <label htmlFor="password">Password:</label>
//              <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
//         </div>
//         <div>
//         <button type="submit">Sign up</button>
//         </div>
//         <div className="home-footer">
//                 <p>Already have an account? <a onClick={handlePopup}>Login</a></p>
//         </div>
//     </form>
//   );
// }
// function LoginPopup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     window.opener.postMessage(
//       {
//         type: 'login',
//         data: { username, password },
//       },
//       window.origin
//     );
//   };
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Log In</button>
//     </div>
//   );
// }


// export default SignupForm;
