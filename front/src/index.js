import React from 'react';
import ReactDOM from 'react-dom';
// import Routes from './routes';
import './index.css';
import App from './App';

ReactDOM.render(
  // <Routes>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  // </Routes>,
  // <Routes/>,
  document.getElementById('root')
)
