import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className='header'>
            <h2>Gokada Service</h2>
            <Link to='/home' className='header-link'>Home</Link>
            <Link className='header-link'>Destination</Link>
            <Link className='header-link'>Blog</Link>
            <Link className='header-link'>Contact</Link>
            {
                
                loggedInUser.isSignedIn?<Link>{loggedInUser.name}</Link>
                :<Link to='/login' className='header-link login-button'>Login</Link>
            }
        </div>
    );
};

export default Header;