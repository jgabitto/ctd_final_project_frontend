import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ActionCable } from 'react-actioncable-provider';
import _ from 'lodash';

// import { listLogEntries } from './API';
import JourneyContext from '../contexts/JourneyContext';

const Map = () => {
    const [journey, dispatchJourney] = useContext(JourneyContext);
    const [locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 29.749907,
        longitude: -95.358421,
        zoom: 8
    });

    // useEffect(() => {
    //     const getLocations = async () => {
    //         const values = await listLogEntries();
    //         console.log(values)
    //         setLocations(values)
    //     }
    //     getLocations();
    // }, [])

    // useEffect(() => {
    //     navigator.geolocation.watchPosition(data => {
    //         console.log(data)
    //         setCurrentLocation(prevState => {
    //             if (prevState) {
    //                 return [...prevState, { lat: data.coords.latitude, lon: data.coords.longitude }]
    //             }
    //             return [{ lat: data.coords.latitude, lon: data.coords.longitude }]
    //         })
    //     }, error => console.log(error), { enableHighAccuracy: true })
    // }, [])

    console.log(journey)

    const handleConnected = (message) => {
        console.log('connected')
    }

    const handleReceived = (message) => {
        console.log(message)
    }

    const renderMarkers = () => {
        return Object.keys(journey).map((key) => {
            return (
                <Marker
                    key={journey[key].id}
                    latitude={journey[key].latitude}
                    longitude={journey[key].longitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <svg style={{ width: `calc(1vmin*${viewport.zoom})`, height: `calc(1vmin*${viewport.zoom})` }} viewBox="0 0 24 24" stroke={key === 'start' ? 'green' : 'red'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </Marker>
            )
        })
    }

    return (
        <>
            {
                !_.isEmpty(journey) ?
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                        {
                            renderMarkers()
                        }
                    </ReactMapGL>
                    : null
            }
        </>
    );
}

export default Map;