import React, { useEffect, useState } from 'react'
import BottomNav from '../comps/BottomNav'
// import CategoryGallery from '../comps/CategoryGallery'
import Header from '../comps/Header'
import Message from '../comps/Message'
import SearchBar from '../comps/SearchBar'
import './messages.scss'
import './app.scss'

// import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home () {
  // const {setUserData} = useContext(UserData);
  // const handleDelete = async () => {
  //     // Here you call the setMessage function which will update state in the `Home` Component
  //     setMessage();
  // }
  const [msgs, setMsgs] = useState([])

  const HandleGetItems = async () => {
    const res = await axios.post('https://www.lendr-bc.me/msg/conversations', {
      headers: { crossDomain: true, 'Content-Type': 'application/json' }
    }, { withCredentials: true })
    setMsgs([...res.data])
  }

  useEffect(() => {
    HandleGetItems()
  }, [])

  return (
    <div className='app'>
      <Header />
      <h1>Messages</h1>
      <div className='search'>
        <SearchBar />
      </div>

      {msgs.map((o, idx) => <Message key={idx} fullname={o.display_name} senderID={o.sender_id} />)}
      <div className='nav'>
        <BottomNav active={4} />
      </div>
    </div>
  )
}
