import React, { useContext } from 'react';
import { Row, Col } from 'antd';

import ViewportContext from '../contexts/ViewportContext';
import Navbar from '../navbar/Navbar';
import RideForm from '../rideForm/RideForm';
import Map from '../map/Map';
import { StyledDiv } from './styles/styles';

const LandingPage = ({ history }) => {
    const [viewport, setViewport] = useContext(ViewportContext);

    return (
        <>
            <Navbar />
            <Row justify="center">
                <Col span={8}>
                    <RideForm history={history} viewport={viewport} setViewport={setViewport} />
                </Col>
                <Col span={8}>
                    <Map viewport={viewport} setViewport={setViewport} />
                </Col>
            </Row>
        </>
    )
}

export default LandingPage;