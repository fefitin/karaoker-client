import React from 'react';
import ReactDOM from 'react-dom';
import Karaoker from './components/Karaoker';
import './assets/global.scss';
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.REACT_APP_ANALYTICS_UA);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <Karaoker />
  </React.StrictMode>,
  document.getElementById('root')
);