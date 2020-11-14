import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
// import './App.css';
// import Pages from "./pages/renterProfile";
// import Pages from "./pages/index";
// import Pages from "./pages/post";
// import Pages from "./pages/login";
// import Pages from "./pages/signUp";
// import Pages from "./pages/item";
// import Pages from "./pages/settings";
import Pages from "./pages/Lsignup";
// import Pages from "./pages/load1";
// import Pages from "./pages/load2";
// import Pages from "./pages/tutorial1";
// import Pages from "./pages/tutorial2";
// import Pages from "./pages/tutorial3";
// import Pages from "./pages/tutorial4";
=======
=======


>>>>>>> 04900ac2178aaa9b95cb3e253040b0f1f8ad51f3
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import Edit from "./pages/edit";
import Index from "./pages";
import Item from "./pages/item";
import Login from "./pages/login";
import Messages from "./pages/messages";
import Post from "./pages/post";
import ProfileSettings from "./pages/profileSettings";
import RenterProfile from "./pages/renterProfile";
import Settings from './pages/settings';
import SignUp from './pages/signUp';
import SpecificCategories from './pages/specificCategories';
<<<<<<< HEAD
>>>>>>> 9a3f86e9ae108a799857a6cbf48104dcc22c7609
=======
import ExplorePage from './pages/explorepage';

import Lsignup from "./pages/Lsignup";
import Load1 from "./pages/load1";
import Load2 from "./pages/load2";
import Tutorial1 from "./pages/tutorial1";
import Tutorial2 from "./pages/tutorial2";
import Tutorial3 from "./pages/tutorial3";
import Tutorial4 from "./pages/tutorial4";
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;
>>>>>>> 04900ac2178aaa9b95cb3e253040b0f1f8ad51f3

const App = () => {

  return (
    <Router>
      <div>
        <Route exact path="/" component={ExplorePage}></Route>
        <Route exact path="/edit" component={Edit}></Route>
        <Route exact path="/explorepage" component={ExplorePage}></Route>
        <Route exact path="/index" component={Index}></Route>
        <Route exact path="/item" component={Item}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/messages" component={Messages}></Route>
        <Route exact path="/post" component={Post}></Route>
        <Route exact path="/profileSettings" component={ProfileSettings}></Route>
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