import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import { StyledDiv } from './styles/styles';
import RideForm from '../rideForm/RideForm';
import Map from '../map/Map';

const LandingPage = () => {
    return (
        <Row justify="center">
            <Col span={8}>
                <RideForm />
            </Col>
            <Col span={8}>
                <Map />
            </Col>
        </Row>
    )
}

export default LandingPage;