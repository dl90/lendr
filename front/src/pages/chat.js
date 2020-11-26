import React, {useEffect, useState} from 'react';
import Header from '../comps/Header';
import './app.scss';
import './chat.scss';

import ChatPrimary from '../comps/ChatPrimary';
import ChatSecondary from '../comps/ChatSecondary';
import MessageBar from '../comps/MessageBar';
import UserAvatar from '../comps/UserAvatar';

import axios from 'axios';

// vvv Chat functionality stuff
/* global WebSocket */
// const www = window.location
// const ws = new WebSocket(`wss://${www.hostname}:${www.port}/msg/live`)

// ws.onopen = () => console.log('connected')
// ws.onclose = () => console.error('disconnected')
// ws.onerror = error => {
//   const div = document.createElement(<ChatPrimary></ChatPrimary>)
//   div.innerText = error
//   document.querySelector('#chat').append(div)
// }

// ws.onmessage = (socket) => {
//   const div = document.createElement(<ChatPrimary></ChatPrimary>)
//   const payload = JSON.parse(socket.data)
//   console.log(socket.data)

//   /*
//     payload {
//       senderID: 1,
//       sender: "John",
//       receiverID: 2,
//       receiver: "Joe",
//       message: "a"
//     }
//   */

//   div.innerText = `From ${payload.sender}: ${payload.message}`
//   document.querySelector('#chat').append(div)
// }

// document.querySelector('#chatBox').addEventListener('submit', e => {
//   e.preventDefault()

// //   const receiverID = document.querySelector('#recipient-id').value
//   const message = document.querySelector('#message').value
//   if (ws.readyState) ws.send(JSON.stringify({ receiverID: +receiverID, message }))

//   const div = document.createElement(<ChatPrimary></ChatPrimary>)
//   div.innerText = ws.readyState
//     ? /*`To ${receiverID}:*/ `${message}`
//     : `Failed to send: ${message}`

//   document.querySelector('#chat').append(div)
//   document.querySelector('#message').value = ''
// })

// ^^^ Chat functionality stuff

export default function Chat() {

    const [Msgs, setMsgs]= useState([]);
    const [RecID, setRecID] = useState("");

    const HandleGetItems = async (name, rate) => {
        var resp = await axios.get('https://www.lendr-bc.me/me', {
            withCredentials: true
        })
    
        var msgresp = await axios.post("https://www.lendr-bc.me/get", {
            ReceiverID: RecID,
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log("repo data");
        console.log(msgresp.data);
        setRecID(msgresp.data)

        setMsgs([...msgresp.data]);
    }

    useEffect(() => {
        HandleGetItems();
    }, [])

    return <div>
        <div className="chat">
        {/* <div className="profile">
            <UserAvatar></UserAvatar>
        </div> */}
        <Header/>
        <div className="threadBox">
            <div className="thread">
                
            <ChatSecondary></ChatSecondary>
            <ChatPrimary></ChatPrimary>

            {
                Msgs.map((o,i)=>{
                    console.log("inside the array...", o,i);
                    return <ChatPrimary
                    // onChange={(e) => {
                    //     setRecID(e.target.value);
                    // }}
                    // itemname={o.title}
                    // price={o.post_description}
                    />
                })
            }
            </div>
        </div>
    </div>
    <div className="msg">
            <MessageBar id={"chatBox"}></MessageBar>
        </div>
    </div>
    
}

