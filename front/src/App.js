import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";
import './App.css';
import Login from "./pages/login";
import Index from "./pages/index";
import Post from "./pages/post";
import Edit from "./pages/edit";
import Messages from "./pages/messages";
import Settings from './pages/settings';

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/post">Post</Link>
        <Route path="/index" component={Home}></Route>
        <Route path="/post" component={PostPage}></Route>
        <Route path="/edit" component={EditPage}></Route>
        <Route path="/messages" component={ChatPage}></Route>
        <Route path="/settings" component={SettingsPage}></Route>
      </div>
      
    </Router>
  );
}

function Home() {
  return <Index></Index>;
}

function EditPage() {
  return <Edit></Edit>;
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