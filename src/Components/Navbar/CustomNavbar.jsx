import React from 'react';
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap";
import DelightLogo from '../../Assets/DelightLogo.png';
import './CustomNavbar.css';
import About from '../Pages/About/About';
import Strategies from '../Pages/Strategies/Strategies';
import { Link, NavLink } from 'react-router-dom';


const CustomNavbar = () => {
    return (
        <div>
            <Navbar className='nav-color'>
                <Container>
                    <Navbar.Brand href="/" className='logo'>
                        <img
                        alt="Delight Logo"
                        src={DelightLogo}
                        className="logo-image"
                        />
                        <div className='app-name'>&#160;Delight</div>
                    </Navbar.Brand>
                </Container>
                <Container>
                    <Nav className='nav-links'>
                        <NavLink to='/about' className="ex-links">About</NavLink>
                        <svg width="80" height="60">
                            <circle cx="20" cy="23" r="5" fill="#75CAFF" />
                        </svg>
                        <NavLink to='/strategies' className="ex-links">Strategies</NavLink>
                        <svg width="80" height="60">
                            <circle cx="20" cy="23" r="5" fill="#75CAFF" />
                        </svg> 
                        <a href="https://github.com/DFong298/Delight" target='_blank' className='ex-links'>Code</a>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default CustomNavbar
