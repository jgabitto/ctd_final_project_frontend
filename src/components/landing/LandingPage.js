import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import { StyledDiv } from './styles/styles';
import RideForm from '../rideForm/RideForm';
import Map from '../map/Map';

const LandingPage = () => {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 29.749907,
        longitude: -95.358421,
        zoom: 8
    });

    return (
        <Row justify="center">
            <Col span={8}>
                <RideForm viewport={viewport} setViewport={setViewport} />
            </Col>
            <Col span={8}>
                <Map viewport={viewport} setViewport={setViewport} />
            </Col>
        </Row>
    )
}

export default LandingPage;