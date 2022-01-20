import React from 'react';
import './HomePage.css';
import HomepageDecor from '../../Assets/HomepageDecor.png'
import SelectStrategy from '../Pages/SelectStrategy/SelectStrategy';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className='home-page'>
            <div className='home-title'>
                Delight
            </div>
            <div className='home-text'>
                Options strategies, made easy
            </div>
            <img
                alt="Home image"
                src={HomepageDecor}
                className="home-image"/>
            <Link to='/varcalculator'>
                <button type='button' className='try-now-button'> Try now </button>
            </Link>
        </div>
    )
}

export default HomePage
