import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './pages/dashboard';
import Main from './layouts/main';

//  bootstrap
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('root');
  if (target) {
    ReactDOM.render(
      <Main/>,
      target,
    );
  } else {
    console.warn('tried to load React and failed :(');
  }
});