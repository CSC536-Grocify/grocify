import React from 'react'
import './main.css'
import {CiSearch} from 'react-icons/ci'
const Main = () => {
    return (
        <section className='main container section'>
            <div className='secTitle'>
                <h3 className='title'>
                    Most Recipes
                </h3>
            </div>
            <div className='secContent grid'>
                    <div className="singleDestination">
                        <label htmlFor="recipe">Enter you meal plan: </label>
                        <div className='input flex'>
                            <input type="text" placeholder='Enter your meal plan ....'/>
                            <CiSearch className="icon"/>
                        </div>
                    </div>
                </div> 
            {/* <div className="homeContent container"> */}

            {/* </div>             */}
        </section>
    )
}

export default Main
