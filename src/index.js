import React from 'react';
import { render } from 'react-dom';
import './css/tailwind.css';
import { BrowserRouter } from "react-router-dom";
import Router from './router/router';

render((
    <BrowserRouter>
        <Router/>
    </BrowserRouter>
), document.getElementById('root'));
