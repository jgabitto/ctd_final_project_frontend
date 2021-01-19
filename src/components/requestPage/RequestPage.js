import React, { useContext, useEffect } from 'react';

import JourneyContext from '../contexts/JourneyContext';
import ViewportContext from '../contexts/ViewportContext';
import ConnectionContext from '../contexts/ConnectionContext';
import Map from '../map/Map';
import OrderForm from './orderForm/OrderForm';

const RequestPage = () => {
  const [CableApp, connection, setConnection] = useContext(ConnectionContext);
  const [journey, dispatchJourney] = useContext(JourneyContext);
  const [viewport, setViewport] = useContext(ViewportContext);

  useEffect(() => {
    setViewport(prevState => {
      return { ...prevState, ...{ width: '100vw', height: '100vh' } };
    })
  }, [])

  useEffect(() => {
    if (connection) connection.send({id: 1, body: journey.start})
  }, [])

  console.log(journey)

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