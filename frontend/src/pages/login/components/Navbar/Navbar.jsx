import React, {useState} from 'react'
import './navbar.css'
import { BsCardChecklist } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { TbGridDots } from 'react-icons/tb'

const Navbar = () => {
    const [active, setActive] = useState('navBar')
    // function to toggle navBar
    const showNav = ()=> {
        setActive('navBar activeNavbar')

    }
    // function to remove navBar
    const removeNavbar = ()=> {
        setActive('navBar')
    }
    return (
        <section className='navBarSection'>
            <header className='header flex'>
                <div className='logoDiv'>
                    <a href=" " className='logo flex'>
                        <h1><BsCardChecklist className='icon' /> Grocify</h1>
                    </a>
                </div>

                <div className={active}>
                    <u1 className="navLists flex">
                        <li className='navItem'>
                            <a href=" " className='navLink'>Welcome</a>
                        </li>

                        {/* <li className='navItem'>
                            <a href="#" className='navLink'>Recipe</a>
                        </li> */}

                        <li className='navItem'>
                            <a href=" " className='navLink'>Blog</a>
                        </li>

                        <li className='navItem'>
                            <a href=" " className='navLink'>About us</a>
                        </li>

                        <li className='navItem'>
                            <a href=" " className='navLink'>Contact</a>
                        </li>
                        {/* <button className='btn'>
                            <a href="#">Log in</a>
                        </button>

                        <button className='btn'>
                            <a href="#">Sign up</a>
                        </button> */}

                    </u1>
                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>
                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    )
}

export default Navbar
