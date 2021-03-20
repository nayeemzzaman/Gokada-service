import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Route, Router, useHistory, useParams } from 'react-router';
import vehicleData from '../../data/data.json';
import './Searching.css'
const Searching = () => {
    const [click , setClick]=useState({
        isClick: false,
        from: '',
        to: '',
    });
    const [data, setData] =useState([]);
    useEffect(()=>{
        setData(vehicleData);
    },[])
    const history =useHistory();
    const handleSubmit=()=>{
        const fromInput=document.getElementById('from').value;
        const toInput=document.getElementById('to').value;
        console.log(fromInput, toInput);
        const change={
            isClick: true,
            from: fromInput,
            to: toInput,
        }
        setClick(change);
    }
    const {vehicle}=useParams();
    const newItem = data.filter(item => item.name===vehicle);
    console.log(newItem);
    return (
        <div>
            <div>
                {
                    click.isClick ?
                    <div className=' result'>
                        <div className='way'>
                            <h3>From: {click.from}</h3>
                            <h3>To: {click.to}</h3>
                        </div>
                        <div className='result-details'>
                            <img className='image' src={newItem[0].image} alt=""/>
                            <img className='logo' src={newItem[0].logo} alt=""/>
                            <h3 className='passenger'>{newItem[0].passenger}</h3>
                            <h3 className='price'>{newItem[0].ticketPrice}</h3>
                        </div>
                        <div className='result-details'>
                            <img className='image' src={newItem[0].image} alt=""/>
                            <img className='logo' src={newItem[0].logo} alt=""/>
                            <h3 className='passenger'>{newItem[0].passenger}</h3>
                            <h3 className='price'>{newItem[0].ticketPrice}</h3>
                        </div>
                        <div className='result-details'>
                            <img className='image' src={newItem[0].image} alt=""/>
                            <img className='logo' src={newItem[0].logo} alt=""/>
                            <h3 className='passenger'>{newItem[0].passenger}</h3>
                            <h3 className='price'>{newItem[0].ticketPrice}</h3>
                        </div>
                    </div>
                    : <form onSubmit={handleSubmit}>
                    <label htmlFor="from">Pick From</label> <br/>
                    <input type="text" name="from" id="from" required/> <br/>
                    <label htmlFor="to">Pick To</label> <br/>
                    <input type="text" name="to" id="to" required/> <br/>
                    <input type="submit" value="Search"/>
                    </form>
                }
                
            </div>
            <div>

            </div>
        </div>
    );
};

export default Searching;