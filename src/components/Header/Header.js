import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css';

const linkStyle={
    textDecoration: 'none',
}
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    
    return (
        <div className='header'>
            <h2>Gokada Service</h2>
            <Link style={linkStyle} to='/home' className='header-link'>Home</Link>
            {
                loggedInUser.isSignedIn?
                <Link style={linkStyle} to={'/searchDestination/:Car'} className='header-link'>Destination</Link>
                : <Link style={linkStyle} to='/login' className='header-link'>Destination</Link>

            }
            
            <Link style={linkStyle} className='header-link'>Blog</Link>
            <Link style={linkStyle} className='header-link'>Contact</Link>
            {
                
                loggedInUser.isSignedIn?<Link style={linkStyle} className='headerLink-user'>{loggedInUser.name}</Link>
                :<Link to='/login'style={linkStyle} className=' login-button'>Login</Link>
            }
        </div>
    );
};

export default Header;