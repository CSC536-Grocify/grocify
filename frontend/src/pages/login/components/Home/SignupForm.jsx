import React, { useState } from 'react';
import './SignupForm.scss';
import { useNavigate } from "react-router-dom";
import {AiOutlineUser} from 'react-icons/ai'


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

  // const handlePopup = () => {
  //     // Open a new web page
  //   const newPage = window.open();
  //   // Create three columns using HTML and CSS
  //   const columnsHTML = `
  //     <style>
  //       .container {
  //           display: flex;
  //           justify-content: space-between;
  //           height: 100%;
  //         }
  //       .column {
  //         width: 33.33%;
  //         float: left;
  //         height: 100%;
  //         padding: 10px;
  //         box-sizing: border-box;
  //       }
  //       </style>
  //         <div class="container">
            
  //           <div class="column">
            
  //           </div>
  //         </div>
  //       `;

  //   // Write the HTML code to the new page
  //   newPage.document.write(columnsHTML);
  // };

  let navigate = useNavigate();

  return (
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input name="Email" type="text" id="email" placeholder = "Email" value={username} onChange={handleUsernameChange} required />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input name="Username" type="text" id="username" placeholder = "Username" value={username} onChange={handleUsernameChange} required />
      </div>
      <div>
        <AiOutlineUser className='icon'/>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder = "Password" id="password" value={password} onChange={handlePasswordChange} required />
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
      <div className="home-footer">
        <p>Already have an account? <a onClick={() => {
          navigate("/main");
        }}>Login</a></p>
      </div>
    </form>
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
