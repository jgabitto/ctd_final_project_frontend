import React, { useContext, useEffect } from 'react';

import JourneyContext from '../contexts/JourneyContext';
import ViewportContext from '../contexts/ViewportContext';
import ConnectionContext from '../contexts/ConnectionContext';
import Map from '../shared/map/Map';
import OrderForm from './orderForm/OrderForm';

const RequestPage = ({ location }) => {
  const [CableApp, connection, setConnection] = useContext(ConnectionContext);
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [viewport, setViewport] = useContext(ViewportContext);

  useEffect(() => {
    setViewport(prevState => {
      return { ...prevState, ...{ width: '100vw', height: '100vh' } };
    })
  }, [])

  useEffect(() => {
    if (connection) connection.send({ id: 1, body: journey.start })
  }, [])

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Map location={location} width={'100vw'} height={'100vh'} viewport={viewport} setViewport={setViewport} />
        <OrderForm />
      </div>
    </>
  )
}

export default RequestPage;