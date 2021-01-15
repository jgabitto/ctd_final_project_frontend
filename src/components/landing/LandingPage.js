import React, { useState, useEffect } from 'react';

import Map from '../map/Map';

const LandingPage = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.watchPosition(data => {
            console.log(data)
            setLocation(prevState => {
                if (prevState) {
                    return [...prevState, {lat: data.coords.latitude, lon: data.coords.longitude}]
                }
                return [{lat: data.coords.latitude, lon: data.coords.longitude}]   
            })
        }, error => console.log(error), {enableHighAccuracy: true})
    },[])
    console.log(location)
    return (
        <div>
            <Map />
        </div>
    )
}

export default LandingPage;