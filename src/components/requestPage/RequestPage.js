import React, { useContext, useEffect } from 'react';

import JourneyContext from '../contexts/JourneyContext';
import ViewportContext from '../contexts/ViewportContext';
import Map from '../map/Map';
import OrderForm from './orderForm/OrderForm';

const RequestPage = () => {
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [viewport, setViewport] = useContext(ViewportContext);

  useEffect(() => {
    setViewport(prevState => {
      return { ...prevState, ...{ width: '100vw', height: '100vh' } };
    })
  }, [])

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Map width={'100vw'} height={'100vh'} viewport={viewport} setViewport={setViewport} />
        <OrderForm />
      </div>
    </>
  )
}

export default RequestPage;