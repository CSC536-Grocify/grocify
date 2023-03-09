import React from 'react';
import './home.css'
import SignupForm from './SignupForm';
import img from '../../Assets/fruits.jpg'
// import { FaFacebookF } from 'react-icons/fa'
// import { AiOutlineTwitter } from 'react-icons/ai'
// import { FaPinterest } from 'react-icons/fa'
// import { BsInstagram } from 'react-icons/bs'


const Home = () => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // // Handle form submission
    // function handleSubmit(event) {
    //     event.preventDefault();

    //     // Validate input values
    //     if (!username || !password) {
    //     alert("Please enter a username and password.");
    //     return;
    //     }

    // Submit form data to server
    // ...
    //]}
    // return (
    //     <section className='home'>
    //         <div className='overlay'></div>
    //         <div className='home'>
    //         <img src= {img} alt =""/> 
    //         <div className="homeContent container"> 
    //             <div className='textDiv'>
    //                 <span className='smallText'>
    //                 With <span className="homeTitle"> Grocify </span> 
    //                 {/* <h1 className="homeTitle"> Grocify</h1> */}
    //                 Categorize your grocery list effortlessly!
    //                 </span>
    //             </div>
    //             <SignupForm />
    //             <div className="home-footer">
    //             <p>Already have an account? <a href="/login">Sign in</a></p>
    //             </div>
    //             </div> 
    //         </div>

    //             {/* <form onSubmit={handleSubmit} className="sign">
    //             <label htmlFor="username">Username:</label>
    //              <input
    //             type="text"
    //             id="username"
    //             value={username}
    //             onChange={(event) => setUsername(event.target.value)}
    //             />
    //             <label htmlFor="password">Password:</label>
    //              <input
    //              type="password"
    //               id="password"
    //              value={password}
    //               onChange={(event) => setPassword(event.target.value)}
    //                 />
    //                 <button type="submit">Sign Up</button>
    //             </form> */}

    //             {/* <div className='cardDiv grid'>
    //                 <div className="destinationInput">
    //                     <label htmlFor="recipe">start here</label>
    //                     <div className='input flex'>
    //                         <input type="text"/>
    //                     </div>
    //                 </div>
    //             </div>  */}

    //             {/* <div className='homeFooterIcons flex'>
    //                 <div className='Icons'>
    //                     <FaFacebookF className="icon"/>
    //                     <AiOutlineTwitter className="icon"/>
    //                     <FaPinterest className="icon"/>
    //                     <BsInstagram className="icon"/>
    //                 </div>
    //             </div> */}

    //         {/* </div> */}

            
    //     </section>
    // )
    return (
        <section className='home'>
          <div className='overlay'></div>
          <div className='img-container'>
            <img src={img} alt="" />
            <div className='content-container'>
              {/* <h1 className="homeTitle">Grocify</h1> */}
              <p className='smallText'>
                With <span className='homeTitle'>Grocify</span> Categorize your grocery list effortlessly!
              </p>
              <SignupForm />
              
            </div>
          </div>
        </section>
      )
}

export default Home
