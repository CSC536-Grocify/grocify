import React, { useState } from 'react';
import './SignupForm.scss';
import { useNavigate } from "react-router-dom";
import {AiOutlineUser} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'
import {BiLockAlt} from 'react-icons/bi'

const SignupForm = (event) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  }

  let navigate = useNavigate();

  return (
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AiOutlineUser className='icon' style={{ marginRight: '8px' }}/>
        {/* <label htmlFor="name">Name:</label> */}
        <input name="name" type="text" id="name" placeholder = "Name" style={{ marginBottom: '25px' }} value={name} onChange={handleNameChange} required />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AiOutlineMail className='icon' style={{ marginRight: '8px' }}/>    
        {/* <label htmlFor="email">Email:</label> */}
        <input name="Email" type="text" id="email" placeholder = "Email" style={{ marginBottom: '25px' }} value={email} onChange={handleEmailChange} required />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <label htmlFor="password">Password:</label> */}
        <BiLockAlt className='icon' style={{ marginRight: '8px' }}/>
        <input type="password" placeholder = "Password" id="password" style={{ marginBottom: '25px' }} value={password} onChange={handlePasswordChange} required />
      </div>
      <div>
        <button type="submit" onClick={() => {
          navigate("/main");
        }}>Sign up</button>
      </div>
      <div className="home-footer">
        <p>Already have an account? <a onClick={() => {
          navigate("/login");
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
