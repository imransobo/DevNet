import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {AuthContextProvider} from "./context/AuthContext";
import Favicon from "react-favicon";
const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Favicon url='/assets/images/profileImages/devnetlogo.png' />
        <BrowserRouter>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);