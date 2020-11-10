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
import explorepage from './pages/explorepage';

const App = () => {
  return (
    <Router>
      <div>
        <Route path="/index" component={explorepage}></Route>
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