import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";

import profileImg from "./assets/profile.jpg";

ReactDOM.render(
    <React.StrictMode>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta property="og:description" content="This website is a personal repository of projects." />
      <meta property="og:image" content="https://avatars.githubusercontent.com/u/43524721?v=4"/>
      <meta property="og:site_name" content="Hawzen" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Hawzen's repo" />
      <meta property="og:url" content="https://www.hawzen.me" />

      <HashRouter>
      <App/>
      </HashRouter> 
    </React.StrictMode>,
    document.getElementById('root')
  
);

// function sendVital(vitals){
//   const body = JSON.stringify(vitals)
//   fetch(
//     "/main_api/vitals", 
//     {body, method: "POST", keepalive: true}
//   );
// }

reportWebVitals()