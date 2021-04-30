import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import vehicleData from '../../data/data.json';
import './Searching.css'

import { Component } from 'react';
import GoogleMap from 'google-map-react';



const markerStyle = {
    height: '50px',
    width: '50px',
    marginTop: '-50px'
}

const imgStyle = {
    height: '100%'
}


const Marker = ({ title }) => (
    <div style={markerStyle}>
        <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
        <h3>{title}</h3>
    </div>
);
const Searching = () => {
    const [click, setClick] = useState({
        isClick: false,
        from: '',
        to: '',
    });
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(vehicleData);
    }, [])
    const history = useHistory();
    const handleSubmit = () => {
        const fromInput = document.getElementById('from').value;
        const toInput = document.getElementById('to').value;
        const change = {
            isClick: true,
            from: fromInput,
            to: toInput,
        }
        setClick(change);
    }
    const { vehicle } = useParams();
    const newItem = data.filter(item => item.name === vehicle);
    console.log(newItem);
    return (
        <div className="searching-body">
            <div className='col-lg-6'>
                {
                    click.isClick ?
                        <div className=' result'>
                            <div className='way'>
                                <h3>From: {click.from}</h3>
                                <h3>To: {click.to}</h3>
                            </div>
                            <div className='result-details'>
                                <img className='image' src={newItem[0]?.image} alt="" />
                                <img className='logo' src={newItem[0]?.logo} alt="" />
                                <h3 className='passenger'>{newItem[0]?.passenger}</h3>
                                <h3 className='price'>{newItem[0]?.ticketPrice}</h3>
                            </div>
                            <div className='result-details'>
                                <img className='image' src={newItem[0]?.image} alt="" />
                                <img className='logo' src={newItem[0]?.logo} alt="" />
                                <h3 className='passenger'>{newItem[0]?.passenger}</h3>
                                <h3 className='price'>{newItem[0]?.ticketPrice}</h3>
                            </div>
                            <div className='result-details'>
                                <img className='image' src={newItem[0]?.image} alt="" />
                                <img className='logo' src={newItem[0]?.logo} alt="" />
                                <h3 className='passenger'>{newItem[0]?.passenger}</h3>
                                <h3 className='price'>{newItem[0]?.ticketPrice}</h3>
                            </div>
                        </div>
                        :
                        <div className='search-form'>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="from">Pick From</label> <br />
                                <input type="text" name="from" id="from" required /> <br />
                                <label htmlFor="to">Pick To</label> <br />
                                <input type="text" name="to" id="to" required /> <br />
                                <button className='searchBtn' type="submit">Search</button>
                            </form>
                        </div>
                }

            </div>
            <div className='map col-lg-6'>
            
                <GoogleMap
                    style={{height: '100%',width: '100%'}}
                    bootstrapURLKeys={{ key: 'AIzaSyBBPQjnhpxQ1c3GtnK5ZgUVYioACEO_Bn8' }}
                    center={{ lat: 23.810331, lng: 90.412521 }}
                    zoom={14}
                >
                    <Marker
                        title={'Current Location'}
                        lat={23.810331}
                        lng={90.412521}
                    >
                    </Marker>
                </GoogleMap>
                
            </div>
        </div>
    );
};

export default Searching;
// GoogleApiWrapper({
//     apiKey: ("AIzaSyAvDo2kVKSJLFkqXNHvCHwIdazDil5a78w")
// })(Searching)