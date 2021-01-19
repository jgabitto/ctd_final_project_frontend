import React, { useState, useEffect, useContext } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

import ConnectionContext from '../contexts/ConnectionContext';
import JourneyContext from '../contexts/JourneyContext';

const Connection = () => {
  const [CableApp, connection, setConnection] = useContext(ConnectionContext);
  const [journey, dispatchJourney] = useContext(JourneyContext);


  useEffect(() => {
    let room;
    if (CableApp) {
      room = CableApp.cable.subscriptions.create({ channel: "RoomChannel", id: 1 }, {
        connected() {
          console.log("we're connected")
        },
        disconnected() {
          console.log("we're disconnected")
        },
        received(data) {
          console.log(data)
          dispatchJourney({
            type: "directions",
            payload: { field: "drivers", value: data},
          });
        }
      })
    }
    setConnection(room);
  }, [])



  return (null)
}

export default Connection;

// import { ActionCableContext } from '../../index'
// import ConnectionContext from '../contexts/ConnectionStore';


// const Connection = () => {
//   // const cable = useContext(ActionCableContext)
//   // const [connection, setConnection] = useContext(ConnectionContext);
//   const [CableApp, connection, setConnection] = useContext(ConnectionContext);


//   // const handleConnected = (message) => {
//   //   console.log('connected')
//   // }

//   // const handleReceived = (message) => {
//   //   console.log(message)
//   // }

//   // return (
//   //   <ActionCableConsumer
//   //       channel={{channel: "RoomChannel", user: {id: 1}}}
//   //       onConnected={handleConnected}
//   //       onReceived={handleReceived}
//   //     >
//   //   <div>
//   //     {}
//   //   </div>
//   //   </ActionCableConsumer>
//   // )
// // const Connection = ({ cableApp }) => {
// //   // const cable = useContext(ActionCableContext)
// //   const [channel, setChannel] = useState(null)

// //   const handleConnected = (message) => {
// //     console.log('connected')
// //   }

// //   const handleReceived = (message) => {
// //     console.log(message)
// //   }

// //   return (
// //     <ActionCableConsumer
// //         channel={{channel: "RoomChannel", user: {id: 5}}}
// //         onConnected={handleConnected}
// //         onReceived={handleReceived}
// //       >
// //     <div>
// //       {}
// //     </div>
// //     </ActionCableConsumer>
// //   )

//   // useEffect(() => {
//   //   console.log(cable)
//   //   const channel = cable.subscriptions.create({
//   //     channel: "RoomChannel",
//   //     id: 4
//   //   });
//   //   console.log(channel)
//   //   setChannel(channel)
//   //   return () => {
//   //     channel.unsubscribe()
//   //   }
//   // }, [])

//     useEffect(() => {
//       console.log(CableApp)
//       let room;
//     if (CableApp) {
//       room = CableApp.cable.subscriptions.create({channel: "RoomChannel", id: 1}, {
//         connected() {
//           console.log("we're connected")
//       },
//         disconnected() {
//           console.log("we're disconnected")
//       },
//         received(data) {
//           console.log('hello')
//           console.log(data)
//         }
//       })
//     }
//     setConnection(room);
//     // setChannel(room);
//   }, [])

//   // useEffect(() => {
//   //   if (connection) {
//   //     let room = connection.subscriptions.create({channel: "RoomChannel", id: 1}, {
//   //       connected() {
//   //         console.log("we're connected")
//   //     },
//   //       disconnected() {
//   //         console.log("we're disconnected")
//   //     },
//   //       received(data) {
//   //         console.log('hello')
//   //         console.log(data)
//   //       }
//   //     })
//   //   }
//   //   // setChannel(room);
//   // }, [])

//   // useEffect(() => {
//   //   // if (channel) channel.send({id: 1, body: 'from  client'})
//   //   if (connection) connection.send({id: 1, body: 'from  client'})

//   // }, [])


//   return (
//     <div>
//       {}
//     </div>
//   )
// }
  // return (
  //   <div>
  //     {}
  //   </div>
  // )
// }

// export default Connection;