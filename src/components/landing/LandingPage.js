import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'antd';

import ViewportContext from '../contexts/ViewportContext';
import JourneyContext from '../contexts/JourneyContext';
import Navbar from '../navbar/Navbar';
import RideForm from './rideForm/RideForm';
import Map from '../map/Map';
import { StyledDiv, Section, Main } from './styles/styles';

const LandingPage = ({ history, location }) => {
    const [viewport, setViewport] = useContext(ViewportContext);
    const [journey, dispatchJourney] = useContext(JourneyContext);

    console.log(viewport);
    useEffect(() => {
        dispatchJourney({
            type: "all",
            payload: { field: "all", value: null },
        });
        setViewport({
            width: 400,
            height: 400,
            latitude: 38.0000,
            longitude: -97.0000,
            zoom: 8
        });
    }, [])

    // return (
    //     <>
    //         <Navbar />
    //         <Row justify="center">
    //             <Col span={8}>
    //                 <RideForm history={history} viewport={viewport} setViewport={setViewport} />
    //             </Col>
    //             <Col span={8}>
    //                 <Map viewport={viewport} setViewport={setViewport} />
    //             </Col>
    //         </Row>
    //     </>
    // )
    return (
        <>
            {/* <Section> */}
            <Main>
                <RideForm history={history} viewport={viewport} setViewport={setViewport} />
                <div className="contain">
                    <Map location={location} viewport={viewport} setViewport={setViewport} />
                </div>
            </Main>
            {/* </Section> */}
        </>
    );
}

export default LandingPage;