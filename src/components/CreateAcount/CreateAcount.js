import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import './CreateAcount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const CreateAcount = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    const [newUser, setNewUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
        error: '',
        success: false,
    });

    const { register, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/login" } };
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
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
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
        else if (event.target.name === 'password') {
            let prevPassword = document.getElementById("prev-password").value;
            let curPassword = event.target.value;
            if (prevPassword !== curPassword) {
                alert("Password doesn't match");
                isFieldValid = false;
            }
        }
        if (isFieldValid) {
            const newUserInfo = { ...newUser };
            newUserInfo[event.target.name] = event.target.value;
            setNewUser(newUserInfo);
        }
    }
    const handleSubmit = (event) => {
        console.log(newUser.name, newUser.email, newUser.password);
        if (newUser.email && newUser.password) {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
                .then(res => {
                    console.log(res);
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    updateUser(newUser.name);
                    setNewUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    const newUserInfo = {};
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    setNewUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                });
        }
        event.preventDefault();
    }
    const updateUser = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log("Updated Successfully");
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div className='create-account'>
            < form className="ship-form" onSubmit={handleSubmit} >
                < input name="name" onBlur={handleBlur} ref={register({ required: true })} placeholder="Your name" />
                {errors.name && <span className="error">Name is required</span>}
                <br />
                < input name="email" onBlur={handleBlur} ref={register({ required: true })} placeholder="Your email" />
                {errors.email && <span className="error">Email is required</span>}
                <br />
                < input type="password" id='prev-password' name="password" ref={register({ required: true })} placeholder="Password" />
                {errors.password && <span className="error">Address is required</span>}
                <br />
                < input type="password" name="password" onBlur={handleBlur} ref={register({ required: true })} placeholder="Confirm Password" />
                {errors.password && <span className="error">Phone Number is required</span>}
                <br />
                <button className='createBtn' type="submit">Create Account</button>
            </form >
            <p>Already have an account ? <span><Link to='/login'>Login</Link></span> </p>
            <p>or</p>
            <button className='facebookBtn' onClick={facebookSignIn}>
                <FontAwesomeIcon icon={faFacebook}style={{fontSize:'20px',marginLeft:'-5px',marginRight:'90px'}}></FontAwesomeIcon> Continue with Facebook</button>
            <br />
            <button className='googleBtn' onClick={googleSignIn}>
                <FontAwesomeIcon icon={faGoogle}style={{fontSize:'20px',marginLeft:'-10px',marginRight:'100px'}}></FontAwesomeIcon> Continue with Google</button>
        </div>
    );
};

export default CreateAcount;