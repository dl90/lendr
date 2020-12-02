import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { AppContext } from '../context/provider'
import axios from 'axios'

import BottomNav from '../comps/BottomNav'
import './app.scss'
import '../pages/explorepage.scss'
import SearchBar from '../comps/SearchBar'
import ReviewCard from '../comps/ReviewCard'
import UserAvatar from '../comps/UserAvatar'
import CategoryButton from '../comps/CategoryButton'

export default function ExplorePage () {
  // use the context to access global state and global function
  const { state, dispatch } = useContext(AppContext)
  const [UserPicture, setUserPicture] = useState(null)
  const [DisplayName, setDisplayName] = useState('')
  // const [ItemPrice, setItemPrice] = useState('10')
  // const [ItemDate, setItemDate] = useState('default item date')
  // const [ItemTitle, setItemTitle] = useState('default title')
  // const [ItemImage, setItemImage] = useState('./placeholderProfile.png')
  // const [username, setUserName] = useState(null)
  const [Items, setItems] = useState([])

  const refetch = async () => {
    const res = await axios.get('https://www.lendr-bc.me/me', { withCredentials: true })
    res.status === 200
      ? dispatch({ type: 'Login', user: res.data })
      : <Redirect to='/' />
  }

  const HandleGetItems = async (name, rate) => {
    const allPosts = await axios.post('https://www.lendr-bc.me/post/get-all', { idx: 0, count: 5 }, {
      headers: { crossDomain: true, 'Content-Type': 'application/json' }
    }, { withCredentials: true })
    setItems([...allPosts.data])
  }

  useEffect(() => {
    HandleGetItems()
  }, [])

  useEffect(() => {
    if (state.user === null) refetch()
    setDisplayName(state.user?.display_name)
    setUserPicture(state.user?.avatar_url)
  }, [state])

  return (
    <div>
      <div className='Header'>
        <div className='Header_top'>
          <div>Hi, {DisplayName}</div>
          <Link to='/settings'>
            <UserAvatar imgsrc={UserPicture} />
          </Link>
        </div>
        <h1>Explore</h1>
        <div className='search'>
          <SearchBar placeholder='Search Items' />
        </div>
        <div className='Category_cont'>
          <div className='Category_header'>
            <h2>Categories</h2>
            <Link to='/index'>
              <h6>See All</h6>
            </Link>
          </div>
          <div className='Category_divs'>
            <Link to='/specificCategories'>
              <CategoryButton src='/vehicles.svg' text='Vehicles' />
            </Link>
            <Link to='/specificCategories'>
              <CategoryButton src='/appliances.svg' text='Appliances' />
            </Link>
            <Link to='/specificCategories'>
              <CategoryButton src='/electronics.svg' text='Electronics' />
            </Link>
            <Link to='/specificCategories'>
              <CategoryButton src='/furniture.svg' text='Furniture' />
            </Link>
          </div>
        </div>
      </div>
      <div className='Recommended_cont'>
        <div className='Section_header'>
          <h2>Recent Posts</h2>
          <Link to='/specificcategories'>
            <h6>See All</h6>
          </Link>
        </div>
        <div className='Recommended_divs'>
          {
            Items.map((o, i) => {
              console.log('explorepage items array', o, i)
              return (
                <Link to={{ pathname: '/item', state: { o } }} key={o.title + i}>
                  <ReviewCard
                    title={o.title}
                    price={o.rate}
                    date={o.created_on}
                    bgImg={o.images[0]}
                  />
                </Link>
              )
            })
          }
        </div>
      </div>
      <div className='Saved_cont'>
        <div className='Section_header'>
          <h2>Recommended</h2>
          <Link to='/specificcategories'>
            <h6>See All</h6>
          </Link>
        </div>
        <div className='Recommended_divs'>
          {
            Items.map((o, i) => {
              console.log('explorepage items array', o, i)
              return (
                <Link to={{ pathname: '/item', state: { o } }} key={o.title + i}>
                  <ReviewCard
                    title={o.title}
                    price={o.rate}
                    date={o.created_on}
                    bgImg={o.images[0]}
                  />
                </Link>
              )
            })
          }
        </div>
      </div>
      <div className='nav'>
        <BottomNav />
      </div>
    </div>
  )
}
