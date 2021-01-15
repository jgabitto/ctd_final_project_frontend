import React, { useState, useEffect, useContext } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

// import { ActionCableContext } from '../../index'


const Connection = ({ cableApp }) => {
  // const cable = useContext(ActionCableContext)
  const [channel, setChannel] = useState(null)

  const handleConnected = (message) => {
    console.log('connected')
  }

  const handleReceived = (message) => {
    console.log(message)
  }

  return (
    <ActionCableConsumer
        channel={{channel: "RoomChannel", user: {id: 5}}}
        onConnected={handleConnected}
        onReceived={handleReceived}
      >
    <div>
      {}
    </div>
    </ActionCableConsumer>
  )

  // useEffect(() => {
  //   console.log(cable)
  //   const channel = cable.subscriptions.create({
  //     channel: "RoomChannel",
  //     id: 4
  //   });
  //   console.log(channel)
  //   setChannel(channel)
  //   return () => {
  //     channel.unsubscribe()
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log(cableApp)
  //   cableApp.room = cableApp.cable.subscriptions.create(
  //   {
  //     channel: "RoomChannel",
  //     id: 4
  //   },
  //   {
  //     connected() {
  //       console.log("we're connected")
  //   }},
  //   {
  //     disconnected() {
  //       console.log("we're disconnected")
  //   }},
  //   {
  //     received(data) {
  //       console.log('hello')
  //       console.log(data)
  //     }
  //   })
  // }, [])

  // return (
  //   <div>
  //     {}
  //   </div>
  // )
}

export default Connection;