import React, { useState, useEffect } from 'react';

const Connection = ({ cableApp }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    cableApp.room = cableApp.cable.subscriptions.create({
      channel: 'RoomsChannel',
      room: 1
    },
      {
        received: (updatedRoom) => {
          console.log(updatedRoom)
        }
      })
  }, [])

  console.log(cableApp)
  return (
    <div>
      {}
    </div>
  )
}

export default Connection;