import React, {useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
    const mapContainer = useRef();
    const [state, setState] = useState({
        lng: 5,
        lat: 34,
        zoom: 2
        })

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [state.lng, state.lat],
            zoom: state.zoom
            });

        map.on('move', () => {
            setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        }) 
    }, [])
    
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {state.lng} | Latitude: {state.lat} | Zoom: {state.zoom}</div>
                </div>
                <div ref={mapContainer} className='mapContainer' />
            </div>
        )
}

export default Map;