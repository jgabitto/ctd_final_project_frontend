import React, { useState, useEffect } from 'react';

import Map from '../map/Map';

const LandingPage = ({cable}) => {
    console.log(cable)
    useEffect(() => {
        
    }, [])

    return (
        <div>
            <Map />
        </div>
    )
}

export default LandingPage;