import React from 'react';


import {
  BrowserRouter as Router,
  useHistory,
  Route,
} from "react-router-dom";
import './App.css';
import Edit from "./pages/edit";
import Index from "./pages";
import Item from "./pages/item";
import Login from "./pages/login";
import Messages from "./pages/messages";
import Post from "./pages/post";
import RenterProfile from "./pages/renterProfile";
import Settings from './pages/settings';
import SignUp from './pages/signUp';
import SpecificCategories from './pages/specificCategories';
// import ExplorePage from './pages/ExplorePage';

import Lsignup from "./pages/Lsignup";
import Load1 from "./pages/load1";
import Load2 from "./pages/load2";
import Tutorial1 from "./pages/tutorial1";
import Tutorial2 from "./pages/tutorial2";
import Tutorial3 from "./pages/tutorial3";
import Tutorial4 from "./pages/tutorial4";

import LendingAvailable from './pages/lendingAvailable';
import LendingLoan from './pages/lendingLoan';
import LendingHistory from './pages/lendingHistory';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/lendingAvailable" component={LendingAvailable}></Route>
        <Route exact path="/lendingLoan" component={LendingLoan}></Route>
        <Route exact path="/lendingHistory" component={LendingHistory}></Route>
        <Route exact path="/edit" component={Edit}></Route>
        <Route exact path="/index" component={Index}></Route>
        <Route exact path="/item" component={Item}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/messages" component={Messages}></Route>
        <Route exact path="/post" component={Post}></Route>
        <Route exact path="/renterProfile" component={RenterProfile}></Route>
        <Route exact path="/settings" component={Settings}></Route>
        <Route exact path="/signUp" component={SignUp}></Route>
        <Route exact path="/specificCategories" component={SpecificCategories}></Route>

        <Route exact path="/Lsignup" component={Lsignup}></Route>
        <Route exact path="/load1" component={Load1}></Route>
        <Route exact path="/load2" component={Load2}></Route>
        <Route exact path="/tutorial1" component={Tutorial1}></Route>
        <Route exact path="/tutorial2" component={Tutorial2}></Route>
        <Route exact path="/tutorial3" component={Tutorial3}></Route>
        <Route exact path="/tutorial4" component={Tutorial4}></Route>

      </div>

    </Router>
  );
}

export default App;