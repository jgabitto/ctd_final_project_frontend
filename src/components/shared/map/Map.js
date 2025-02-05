import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { CarOutlined } from '@ant-design/icons';
import { ActionCable } from 'react-actioncable-provider';
import _ from 'lodash';

// import { listLogEntries } from './API';
import { MAPBOX_DIRECTIONS_URL, MAPBOX_DIRECTIONS_PARAMS } from '../../../utils/constants/constants';
import calcMidpoint from '../../../utils/calcMidpoint';
import JourneyContext from '../../contexts/JourneyContext';
import Directions from '../directions/Directions';

const Map = ({ viewport, setViewport, width, height, location }) => {
    const [journey, dispatchJourney] = useContext(JourneyContext);
    const [locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        setViewport(prevState => {
            return { ...prevState, width, height };
        })
    }, [])

    useEffect(() => {
        const getDirections = async () => {
            let zoom;
            const url = encodeURI(`${journey.start.longitude},${journey.start.latitude};${journey.end.longitude},${journey.end.latitude}`);
            const data = await fetch(`${MAPBOX_DIRECTIONS_URL}/${url}${MAPBOX_DIRECTIONS_PARAMS}${process.env.REACT_APP_MAPBOX_TOKEN}`)
            const res = await data.json();
            const distance = res.routes[0].distance * 0.00062;
            dispatchJourney({
                type: "directions",
                payload: { field: "directions", value: res },
            });
            const midPoint = {
                ...calcMidpoint(journey.start.latitude, journey.start.longitude, journey.end.latitude, journey.end.longitude)
            }

            if (distance > 20) {
                zoom = 8;
            } else if (distance > 6) {
                zoom = 11.5;
            } else if (distance > 2) {
                zoom = 12;
            } else {
                zoom = 13;
            }
            setViewport(prevState => {
                return { ...prevState, ...midPoint, zoom }
            })
        }


        if ((journey.hasOwnProperty('start') && journey.start) && (journey.hasOwnProperty('end') && journey.end)) {
            getDirections();
        }
    }, [journey.start, journey.end])

    const renderMarkers = () => {
        let address;
        return Object.keys(journey).map((key) => {
            if ((key === 'start' && journey.start) || (key === 'end' && journey.end)) {
                address = journey[key].value.split(',');
            }
            return (
                <>
                    {
                        (key === 'start' && journey.start) || (key === 'end' && journey.end) ?
                            <React.Fragment key={journey[key].id}>
                                <Marker
                                    key={`${journey[key].id}_marker`}
                                    latitude={journey[key].latitude}
                                    longitude={journey[key].longitude}
                                    offsetLeft={-10}
                                    offsetTop={-25}
                                >
                                    <svg style={{ width: `24px`, height: `24px` }} viewBox="0 0 24 24" stroke="black" strokeWidth="2" fill={key === 'start' ? 'green' : 'red'} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </Marker>
                                <Popup
                                    key={`${journey[key].id}_popup`}
                                    latitude={journey[key].latitude}
                                    longitude={journey[key].longitude}
                                    closeButton={false}
                                    offsetTop={0}
                                    offsetLeft={0}
                                    // style={{ width: `calc(1vmin*${viewport.zoom})`, height: `calc(1vmin*${viewport.zoom})` }}
                                    anchor="top" >
                                    <div><strong>{address[0]}</strong></div>
                                </Popup>
                            </React.Fragment>
                            : null
                    }
                </>
            )
        })
    }


    const renderDirections = () => {
        if (journey.directions.hasOwnProperty('message')) {
            return (
                <div>
                    {journey.directions.message}
                </div>
            )
        }
        const { directions: { routes: [{ geometry: { coordinates } }] } } = journey;
        return (
            <Directions points={[[journey.start.longitude, journey.start.latitude], ...coordinates, [journey.end.longitude, journey.end.latitude]]} />
        )
    }

    const renderDrivers = () => {
        if (journey.ride) {
            console.log(journey.ride)
            return (
                <>
                    <Marker
                        key={`${journey.ride.driver_id}_marker`}
                        latitude={journey.ride.latitude}
                        longitude={journey.ride.longitude}
                        offsetLeft={-10}
                        offsetTop={-25}
                    >
                        <svg width="36px" height="36px" viewBox="0 0 24 24"><path d="M3 18v-5a2 2 0 0 1 2-2V8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3a2 2 0 0 1 2 2v5a2 2 0 1 1-4 0H7a2 2 0 1 1-4 0zM9 6a2 2 0 0 0-2 2v3h10V8a2 2 0 0 0-2-2H9zm-3 9a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm12 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2z" fill="black" /><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                    </Marker>
                </>
            )
        }
        return journey.drivers.map((driver) => {
            return (
                <>
                    <Marker
                        key={`${driver.id}_marker`}
                        latitude={driver.latitude}
                        longitude={driver.longitude}
                        offsetLeft={-10}
                        offsetTop={-25}
                    >
                        <svg width="36px" height="36px" viewBox="0 0 24 24"><path d="M3 18v-5a2 2 0 0 1 2-2V8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3a2 2 0 0 1 2 2v5a2 2 0 1 1-4 0H7a2 2 0 1 1-4 0zM9 6a2 2 0 0 0-2 2v3h10V8a2 2 0 0 0-2-2H9zm-3 9a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm12 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2z" fill="black" /><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                    </Marker>
                </>
            )
        })
    }

    return (
        <>
            {
                journey.start || journey.end ?
                    <ReactMapGL
                        {...viewport}
                        style={location.pathname === '/request' ? { position: 'absolute' } : null}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                        {
                            journey.start && journey.end && journey.directions ? renderDirections() : null
                        }
                        {
                            journey.drivers ? renderDrivers() : null
                        }
                        {
                            renderMarkers()
                        }
                        <div style={location.pathname === '/request' ? { position: 'absolute', right: '10px', top: '100px' } : { position: 'absolute', right: 0 }}>
                            <NavigationControl />
                        </div>
                    </ReactMapGL>
                    : null
            }
        </>
    );
}

export default Map;
