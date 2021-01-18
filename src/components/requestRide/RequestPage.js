import React, { useContext } from 'react';

import JourneyContext from '../contexts/JourneyContext';
import ViewportContext from '../contexts/ViewportContext';
import Map from '../map/Map';

const RequestPage = () => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [viewport, setViewport] = useContext(ViewportContext);


  return (
    <Map width={'100vw'} height={'100vh'} viewport={viewport} setViewport={setViewport} />
  )
}

export default RequestPage;