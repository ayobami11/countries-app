import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Home from './components/Home';
import CountryDetails from './components/CountryDetails';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Navigate to='countries' />} />
                    <Route path='countries' element={<Home />}>
                        <Route path=':country' element={<CountryDetails />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
