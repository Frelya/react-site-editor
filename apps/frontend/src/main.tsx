import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import './main.css';
import 'react-tooltip/dist/react-tooltip.css';
import reportWebVitals from './reportWebVitals';
import { routes } from '@/routes/routes';
import { store } from '@/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <RouterProvider router={routes} />
        </StoreProvider>
    </React.StrictMode>
);

reportWebVitals();
