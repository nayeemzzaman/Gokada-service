import React from 'react';
import './VehicleCard.css'
const VehicleCard = (props) => {
    
    console.log(props);
    const {name, image}=props.card;
    console.log(name, image);
    return (
        <div className="home-card">
            <img src={image} alt="" />
            <h3>{name}</h3>
        </div>
    );
};

export default VehicleCard;