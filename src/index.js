import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import './animations.css';
import 'react-dates/initialize';
import App from './App';

ReactDOM.render(<App />, document.getElementById('ll'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function () { console.log('Service Worker v1.2 Registered'); });
}