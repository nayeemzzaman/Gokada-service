import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
const Login = () => {
    // const {register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // const onSubmit = data => console.log(data);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });
    const googleSignIn = () => {
        var gProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(gProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true,
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }
    const facebookSignIn = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then(res=> {
                const { displayName, photoURL, email } = res.user;
                const signInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true,
                }
                setUser(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                alert(errorMessage);
            });
    }
    const handleSubmit = (event) => {
        console.log(user.email, user.password);
        if (user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const { displayName, email } = res.user;
                    const signInUser = {
                        isSignedIn: true,
                        name: displayName,
                        email: email,
                        photo: '',
                        success: true,
                    }
                    setUser(signInUser);
                    setLoggedInUser(signInUser);
                    history.replace(from);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    const newUserInfo = {}
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    alert(errorMessage);
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                });
        }
        else{
            alert("Wrong password or email");
        }
        event.preventDefault();
    }
    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        else if (event.target.name === 'password') {
            const isPassValid = event.target.value.length > 6;
            const isPassHasNum = /\d{1}/.test(event.target.value);
            isFieldValid = isPassHasNum && isPassValid;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    return (
        // < form className="ship-form" onSubmit = { handleSubmit(onSubmit) } >
        //     < input name = "email" defaultValue={loggedInUser.email} ref = { register({ required: true })}placeholder ="Your email" />
        //     { errors.email && <span className = "error">Email is required</span> }

        //     < input name = "password" ref = { register({ required: true })} placeholder ="Password"/>
        //     { errors.address && <span className = "error">Password is required</span> }
        //     <input type="submit" />
        // </form >
        <div className='login-page'>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" onBlur={handleBlur} placeholder="Your email address" required />
                    <br />
                    <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
                    <br />
                    <button className='loginBtn' type="submit">Login</button>
                </form>
                <p>New user ? <span><Link to='/createAccount'>Create Account</Link></span> </p>
            </div>
            <p>or</p>
            <button className='facebookBtn' onClick={facebookSignIn}>
                <FontAwesomeIcon icon={faFacebook}style={{fontSize:'20px',marginLeft:'-5px',marginRight:'90px'}}></FontAwesomeIcon> Continue with Facebook</button>
            <br />
            <button className='googleBtn' onClick={googleSignIn}>
                <FontAwesomeIcon icon={faGoogle}style={{fontSize:'20px',marginLeft:'-10px',marginRight:'100px'}}></FontAwesomeIcon> Continue with Google</button>
        </div>
    );
};

export default Login;