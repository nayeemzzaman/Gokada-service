import React, { useEffect, useState } from 'react';
import bike from '../../images/bike.png';
import bus from '../../images/bus.png';
import car from '../../images/car.png';
import train from '../../images/train.png';
import './Home.css';

import { Link } from 'react-router-dom';
import vehicleData from '../../data/data.json';
import VehicleCard from '../VehicleCard/VehicleCard';
const Home = () => {
    const [data, setData] =useState();
    useEffect(()=>{
        setData(vehicleData);
    })
    const linkStyle={
        textDecoration: 'none',
    }

    return (
        <div className="container home">
        {
            data?.map(card => <Link style={linkStyle} to={"/searchDestination/" + card.name}><VehicleCard card={card}></VehicleCard></Link>)
        }
            {/* <div className="container home-area">
                <div className="home-card">
                    <Link to={"/searchDestination/" + "bike"}>
                        <img src={bike} alt="" />
                        <h3>BIKE</h3>
                    </Link>
                </div>
                <div className="home-card">
                    <Link  to={"/searchDestination/" + "bus"}>
                        <img src={bus} alt="" />
                        <h3>BUS</h3>
                    </Link>
                </div>
                <div className="home-card">
                    <Link  to={"/searchDestination/" + "car"}>
                        <img src={car} alt="" />
                        <h3>CAR</h3>
                    </Link>
                </div>
                <div className="home-card" >
                    <Link to={"/searchDestination/" + "train"}>
                        <img src={train} alt="" />
                        <h3>TRAIN</h3>
                    </Link>
                </div>
            </div> */}
        </div>
    );
};

export default Home;