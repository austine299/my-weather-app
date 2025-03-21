import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState(null);


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ec095b6856962a9098bccfea8db60a7c`

  const searchLocation = (event) =>{
    if(event.key === "Enter"){
        axios.get(url).then((response) => {
            setData(response.data)
        
        })
        setLocation("")
    }
    
  }


  return (
    <div className={data.weather ? data.weather[0].main : "app"}>
        <div className="search">
            <input className="" 
                type='text'
                value={location}
                onChange={event=> setLocation(event.target.value) }
                onKeyDown={searchLocation}
                placeholder='Enter your location'
            />
        </div>
      <div className="container">
        <div className="top">
            <div className="location">
                <p>{data.name}</p>
            </div>
            <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°F </h1>:null}
            </div>
            <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p>:null}
            </div>
        </div>
        {data.name != undefined && 
            <div className="bottom">
                <div className="feels">
                    {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °F</p>:null}
                    <p className='description-p'> Feels like</p>
                </div>
                <div className="humidity">
                    {data.main ? <p className="bold">{data.main.humidity}%</p>:null}
                    <p className='description-p'>Humidity</p>
                </div>
                <div className="wind">
                    {data.wind ? <p className="bold">{data.wind.speed}MPH</p>:null}
                    <p className='description-p'>Wind Speed</p>
                </div>
            </div>
        }
      </div>
    </div>
  );
};

export default WeatherApp;
