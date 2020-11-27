import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

// import LogoPage from './comps/LogoPage'

import Chat from './pages/chat'
import Edit from './pages/edit'
import Index from './pages'
import Item from './pages/item'
import Login from './pages/login'
import LendingAvailable from './pages/lendingAvailable'
import LendingHistory from './pages/lendingHistory'
import LendingLoan from './pages/lendingLoan'
import Messages from './pages/messages'
import Post from './pages/post'
import ProfileSettings from './pages/profileSettings'
import RenterProfile from './pages/renterProfile'
import Settings from './pages/settings'
import SignUp from './pages/signUp'
import SpecificCategories from './pages/specificCategories'
import ExplorePage from './pages/explorepage'

import Lsignup from './pages/Lsignup'
import Load1 from './pages/load1'
import Load2 from './pages/load2'
import Tutorial1 from './pages/tutorial1'
import Tutorial2 from './pages/tutorial2'
import Tutorial3 from './pages/tutorial3'
import Tutorial4 from './pages/tutorial4'
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

export const UserContext = React.createContext()
export const TargetUserContext = React.createContext()

export default () => {
  const [user, setUser] = useState(null)
  const [targetUserID, setTargetUserID] = useState(null)

  const currentUser = { user, setUser }
  const targetUser = { targetUserID, setTargetUserID }

  return (
    <Router>
      {/* <LogoPage /> */}
      <UserContext.Provider value={currentUser}>

        <Route exact path='/' component={Lsignup} />

        <TargetUserContext.Provider value={targetUser}>
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/messages' component={Messages} />
        </TargetUserContext.Provider>

        <Route exact path='/edit' component={Edit} />
        <Route exact path='/explorePage' component={ExplorePage} />
        <Route exact path='/index' component={Index} />
        <Route exact path='/item' component={Item} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/lendingAvailable' component={LendingAvailable} />
        <Route exact path='/lendingHistory' component={LendingHistory} />
        <Route exact path='/lendingLoan' component={LendingLoan} />
        <Route exact path='/post' component={Post} />
        <Route exact path='/profileSettings' component={ProfileSettings} />
        <Route exact path='/renterProfile' component={RenterProfile} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/signUp' component={SignUp} />
        <Route exact path='/specificCategories' component={SpecificCategories} />

        <Route exact path='/load1' component={Load1} />
        <Route exact path='/load2' component={Load2} />
        <Route exact path='/tutorial1' component={Tutorial1} />
        <Route exact path='/tutorial2' component={Tutorial2} />
        <Route exact path='/tutorial3' component={Tutorial3} />
        <Route exact path='/tutorial4' component={Tutorial4} />

      </UserContext.Provider>
    </Router>
  )
}
