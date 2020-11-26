import React, { useEffect, useState } from 'react';
import Header from '../comps/Header';
import './app.scss';
import './chat.scss';

import ChatPrimary from '../comps/ChatPrimary';
import ChatSecondary from '../comps/ChatSecondary';
import MessageBar from '../comps/MessageBar';
import UserAvatar from '../comps/UserAvatar';

import axios from 'axios';

export default function Chat () {
    const [Msgs, setMsgs] = useState([]);
    const [RecID, setRecID] = useState("");

    const HandleGetItems = async (name, rate) => {
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
        setupWebsocketConnection()
    }, [])

    // vvv Chat functionality stuff
    /* global WebSocket */
    let ws
    function setupWebsocketConnection() {
        ws = new WebSocket(`wss://www.lendr-bc.me/msg/live`)

        ws.onopen = () => console.log('connected')
        ws.onclose = () => console.error('disconnected')
        ws.onerror = error => {
            console.log(error)
            setMsgs([error.message])
        }

        ws.onmessage = (socket) => {
            const payload = JSON.parse(socket.data)
            console.log(payload)

            setMsgs([...Msgs, payload])

            /*
            payload {
                senderID: 1,
                sender: "John",
                receiverID: 2,
                receiver: "Joe",
                message: "a"
            }
            */
            console.log(payload)
            // console.log(sendMsgRef.current)
            // chatRef.current.append(<ChatPrimary message={payload.message} />)
        }
    }



    function submitCBProp ({id, text}) {

        const receiverID = id
        if (ws.readyState) {
            ws.send(JSON.stringify({ receiverID: +receiverID, message: text }))
        }

        // setMsgs([...Msgs, {message: text}])
        console.log(ws.readyState)
    }

    // ^^^ Chat functionality stuff


    return (<div>
        <div className="chat" >
            {/* <div className="profile">
            <UserAvatar></UserAvatar>
        </div> */}
            <Header />
            <div className="threadBox">
                <div className="thread">

                    <ChatSecondary></ChatSecondary>
                    <ChatPrimary></ChatPrimary>

                    {
                        Msgs.map((payload, i) => {
                            console.log("inside the array...", payload, i);
                            return <ChatPrimary
                            key={"chat"+i}
                            // onChange={(e) => {
                            //     setRecID(e.target.value);
                            // }}
                            // itemname={o.title}
                            // price={o.post_description}
                            message={payload.message}
                            />
                        })
                    }
                </div>
            </div>
        </div>
        <div className="msg">
            <MessageBar onSubmit={submitCBProp}></MessageBar>
        </div>
    </div>)
}
