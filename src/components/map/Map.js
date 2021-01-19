import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { ActionCable } from 'react-actioncable-provider';
import _ from 'lodash';

// import { listLogEntries } from './API';
import { MAPBOX_DIRECTIONS_URL, MAPBOX_DIRECTIONS_PARAMS } from '../../utils/constants/constants';
import calcMidpoint from '../../utils/calcMidpoint';
import JourneyContext from '../contexts/JourneyContext';
import Directions from '../directions/Directions';

const Map = ({ viewport, setViewport, width, height }) => {
    const [journey, dispatchJourney] = useContext(JourneyContext);
    const [locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        setViewport(prevState => {
            return { ...prevState, width, height };
        })
    }, [])

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
            } else {
                zoom = 11.5
            }
            setViewport(prevState => {
                return { ...prevState, ...midPoint, zoom }
            })
        }


        if ((journey.hasOwnProperty('start') && journey.start) && (journey.hasOwnProperty('end') && journey.end)) {
            getDirections();
        }
    }, [journey.start, journey.end])

    console.log(journey)

    // const handleConnected = (message) => {
    //     console.log('connected')
    // }

    // const handleReceived = (message) => {
    //     console.log(message)
    // }

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

    return (
        <>
            {
                journey.start || journey.end ?
                    <ReactMapGL
                        {...viewport}
                        style={{ position: 'absolute' }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                        <div style={{ position: 'absolute', right: 0 }}>
                            <NavigationControl />
                        </div>
                        {
                            journey.directions ? renderDirections() : null
                        }
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