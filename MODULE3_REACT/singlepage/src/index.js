import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import IntersectionDemo from  './IntersectionObserver/IntersectionDemo';
import Grids from './MaterialUi/Grids'
import {Grid} from '@material-ui/core'


ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <IntersectionDemo></IntersectionDemo> */}
    {/* <Grids></Grids> */}
  </React.StrictMode>,
  document.getElementById('root')
);

