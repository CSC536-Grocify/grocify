import React, { useState } from 'react';
import './LoginForm.scss';
import { useNavigate } from "react-router-dom";
import {BiLockAlt} from 'react-icons/bi'
import {AiOutlineMail} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { setCredentials, setToken } from '../../../../features/auth/authSlice';
import { useLoginMutation } from '../../../../features/auth/authApiSlice';

const LoginForm = (event) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  let navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setToken(userData.tokens));
      dispatch(setCredentials({ username: userData.username, email: email }))
      setEmail('');
      setPassword('');
      navigate('/main');
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  }

  return ( isLoading ? <div>Loading...</div> : (
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AiOutlineMail className='icon' style={{ marginRight: '8px' }}/>
        {/* <label htmlFor="email">Email:</label> */}
        <input name="Email" type="text" id="email" placeholder = "Email" style={{ marginBottom: '25px' }} value={email} onChange={handleEmailChange} required />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BiLockAlt className='icon' style={{ marginRight: '8px' }}/>
        {/* <label htmlFor="password">Password:</label> */}
        <input type="password" placeholder = "Password" id="password" style={{ marginBottom: '25px' }} value={password} onChange={handlePasswordChange} required />
      </div>
      <button type="submit" >Login</button>
      <div>{errMsg}</div>
    </form>
    </div>
  ));
};

export default LoginForm;

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

