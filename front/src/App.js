import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// import './App.css';
import Pages from "./pages/index";

function App() {
  return (
    <Router>
      <Pages />
    </Router>
  );
}


export default App;
