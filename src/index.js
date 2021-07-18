import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {polyfill} from "mobile-drag-drop"; // Allows drag-and-drop code to work on mobile browsers https://github.com/timruffles/mobile-drag-drop

polyfill({
    // Sets drag delay to allow scrolling instead
    holdToDrag: 150
});
window.addEventListener('touchmove', function() {}); // Allows polyfill to work properly in mobile Safari

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);