import React, { useEffect, useState, useContext, useRef } from 'react'
import Header from '../comps/Header'
import './app.scss'
import './chat.scss'

import ChatPrimary from '../comps/ChatPrimary'
import ChatSecondary from '../comps/ChatSecondary'
import MessageBar from '../comps/MessageBar'
// import UserAvatar from '../comps/UserAvatar'

import { TargetUserContext, UserContext } from '../App'
import axios from 'axios'

export default function Chat () {
  const { targetUserID } = useContext(TargetUserContext)
  const { user } = useContext(UserContext)
  const [myMsgs, setMyMsgs] = useState([])
  const [theirMsgs, setTheirMsgs] = useState([])
  const [serverStatus, setServerStatus] = useState('')
  const ws = useRef(null)

  const getAllPrevChat = async () => {
    const allMsgs = await axios.post('https://www.lendr-bc.me/msg/get', {
      receiverID: targetUserID,
      headers: { crossDomain: true, 'Content-Type': 'application/json' }
    }, { withCredentials: true })

    /*
    [
      {id: 15, message: "howdy", receiver_id: 18, sender_id: 1, sender_displayName: "Testy test"},
      {id: 14, message: "hey", receiver_id: 1, sender_id: 18, sender_displayName: "Testy!"}
    ]
     */
    setMyMsgs(allMsgs.data.filter(payload => payload.sender_id === user?.id))
    setTheirMsgs(allMsgs.data.filter(payload => payload.sender_id === targetUserID))
  }

  useEffect(() => {
    getAllPrevChat()
    setupWebsocketConnection()
  }, [])

  useEffect(() => {
    console.log(serverStatus)
  }, [serverStatus])

  function setupWebsocketConnection () {
    ws.current = new window.WebSocket('wss://www.lendr-bc.me/msg/live')
    ws.current.onopen = () => setServerStatus('connected')
    ws.current.onclose = () => setServerStatus('disconnected')
    ws.current.onerror = e => setServerStatus(e.message)
    /*
    payload {
        senderID: 1,
        sender: "John",
        receiverID: 2,
        receiver: "Joe",
        message: "a"
    }
    */
    ws.current.onmessage = (socket) => {
      const payload = JSON.parse(socket.data)
      if (payload.receiverID === user?.id) setTheirMsgs([...theirMsgs, payload])
    }
  }

  function submitNewMsg (text) {
    if (ws.current.readyState) ws.current.send(JSON.stringify({ receiverID: +targetUserID, message: text }))
    setMyMsgs([...myMsgs, { message: text }])
  }

  return (
    <div>
      <div className='chat'>
        <div className='profile'>
          {/* <UserAvatar /> */}
        </div>
        <Header />
        <div className='threadBox'>
          <div className='thread'>
            {theirMsgs.map((payload, i) => <ChatSecondary key={'them' + i} message={payload.message} />)}
            {myMsgs.map((payload, i) => <ChatPrimary key={'me' + i} message={payload.message} />)}
          </div>
        </div>
      </div>
      <div className='msg'>
        <MessageBar cb={submitNewMsg} />
      </div>
    </div>
  )
}
