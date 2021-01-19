import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL from 'react-map-gl';
// import { ActionCable } from 'react-actioncable-provider';
import { ActionCableConsumer } from 'react-actioncable-provider';

// import { listLogEntries } from './API';
import ConnectionContext from '../contexts/ConnectionStore';

const Map = () => {
    const [CableApp, connection, setConnection] = useContext(ConnectionContext);
    const [location, setLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 29.749907,
        longitude: -95.358421,
        zoom: 8
    });

    useEffect(() => {
        if (connection) connection.send({id: 1, body: 'from client'})
    }, [CableApp.cable.subscriptions])

    const sendData = () => {
        connection.send({id: 1, body: 'from client'})
    }

    // useEffect(() => {
    //     const getLogEntries = async () => {
    //         const logEntries = await listLogEntries();
    //         console.log(logEntries)
    //     }
    //     getLogEntries();
    // }, [])

    // useEffect(() => {
    //     navigator.geolocation.watchPosition(data => {
    //         console.log(data)
    //         setLocation(prevState => {
    //             if (prevState) {
    //                 return [...prevState, { lat: data.coords.latitude, lon: data.coords.longitude }]
    //             }
    //             return [{ lat: data.coords.latitude, lon: data.coords.longitude }]
    //         })
    //     }, error => console.log(error), { enableHighAccuracy: true })
    // }, [])
    console.log(location)

    const handleConnected = (message) => {
        console.log(message)
    }

    const handleReceived = (message) => {
        console.log(message)
    }

    return (
        <>
        {/* <ActionCableConsumer
        channel={{channel: "RoomChannel", user: {id: 1}}}
        onConnected={handleConnected}
        onReceived={handleReceived}
        >
        </ActionCableConsumer> */}
        <button onClick={sendData}>Click me</button>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={nextViewport => setViewport(nextViewport)}
            />
            </>
    );
}

export default Map;