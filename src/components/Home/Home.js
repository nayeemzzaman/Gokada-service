import React from 'react';
import bike from '../../images/bike.png';
import bus from '../../images/bus.png';
import car from '../../images/car.png';
import train from '../../images/train.png';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className="home">
            <div className="container home-area">
                <Link className="home-card" to={"/searchDestination/"+"bike"}>
                    <img src={bike} alt="" />
                    <h3>BIKE</h3>
                </Link>
                <Link className="home-card" to={"/searchDestination/"+"bus"}>
                    <img src={bus} alt="" />
                    <h3>BUS</h3>
                </Link>
                <Link className="home-card" to={"/searchDestination/"+"car"}>
                    <img src={car} alt="" />
                    <h3>CAR</h3>
                    </Link>
                    <Link className="home-card" to={"/searchDestination/"+"train"}>
                        <img src={train} alt="" />
                        <h3>TRAIN</h3>
                    </Link>
            </div>
        </div>
    );
};

export default Home;