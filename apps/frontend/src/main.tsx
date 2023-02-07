import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Button}  from '@react-site-editor/ui'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
       <Button 
        text="Click me" 
        onClick={() => alert('Button was clicked!')} 
        style={{backgroundColor: 'blue', color: 'white', padding: '10px 20px'}} 
      />
        <App />
    </React.StrictMode>
);
