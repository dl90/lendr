import React from 'react';


import {
  BrowserRouter as Router,
  Link,
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

import Lsignup from "./pages/Lsignup";
import Load1 from "./pages/load1";
import Load2 from "./pages/load2";
import Tutorial1 from "./pages/tutorial1";
import Tutorial2 from "./pages/tutorial2";
import Tutorial3 from "./pages/tutorial3";
import Tutorial4 from "./pages/tutorial4";

const App = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={Landing}></Route>
        <Route path="/edit" component={EditPage}></Route>
        <Route path="/index" component={Home}></Route>
        <Route path="/item" component={ItemPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/messages" component={ChatPage}></Route>
        <Route path="/post" component={PostPage}></Route>
        <Route path="/renterProfile" component={RenterProfilePage}></Route>
        <Route path="/settings" component={SettingsPage}></Route>
        <Route path="/signUp" component={SignUpPage}></Route>
        <Route path="/specificCategories" component={SpecificCategoriesPage}></Route>

        <Route path="/Lsignup" component={LsignupPage}></Route>
        <Route path="/load1" component={Load1Page}></Route>
        <Route path="/load2" component={Load2Page}></Route>
        <Route path="/tutorial1" component={Tutorial1Page}></Route>
        <Route path="/tutorial2" component={Tutorial2Page}></Route>
        <Route path="/tutorial3" component={Tutorial3Page}></Route>
        <Route path="/tutorial4" component={Tutorial4Page}></Route>
      </div>
      
    </Router>
  );
}
function Landing() {
  return <Login></Login>;
}
function LoginPage() {
  return <Login></Login>;
}
function Home() {
  return <Index></Index>;
}
function ItemPage() {
  return <Item></Item>;
}
function EditPage() {
  return <Edit></Edit>;
}
function RenterProfilePage() {
  return <RenterProfile></RenterProfile>;
}
function SignUpPage() {
  return <SignUp></SignUp>;
}
function SpecificCategoriesPage() {
  return <SpecificCategories></SpecificCategories>;
}

function LsignupPage() {
  return <Lsignup></Lsignup>;
}
function Load1Page() {
  return <Load1></Load1>;
}
function Load2Page() {
  return <Load2></Load2>;
}
function Tutorial1Page() {
  return <Tutorial1></Tutorial1>;
}
function Tutorial2Page() {
  return <Tutorial2></Tutorial2>;
}
function Tutorial3Page() {
  return <Tutorial3></Tutorial3>;
}
function Tutorial4Page() {
  return <Tutorial4></Tutorial4>;
}
// Navbar
function PostPage() {
  return <Post></Post>;
}
function ChatPage() {
  return <Messages></Messages>;
}
function SettingsPage() {
  return <Settings></Settings>;
}

export default App;