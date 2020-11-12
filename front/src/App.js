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

// import './App.css';
// import Pages from "./pages/renterProfile";
// import Pages from "./pages/index";
// import Pages from "./pages/post";
// import Pages from "./pages/login";
// import Pages from "./pages/signUp";
// import Pages from "./pages/item";
// import Pages from "./pages/settings";
// import Pages from "./pages/Lsignup";
// import Pages from "./pages/load1";
// import Pages from "./pages/load2";
// import Pages from "./pages/tutorial1";
// import Pages from "./pages/tutorial2";
// import Pages from "./pages/tutorial3";
// import Pages from "./pages/tutorial4";

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