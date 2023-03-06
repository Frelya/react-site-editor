import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import './main.css';
import 'react-tooltip/dist/react-tooltip.css';
import reportWebVitals from './reportWebVitals';
import { routes } from '@/routes/routes';
import { store } from '@/store/store';
import { MittProvider } from './plugins/mitt/react-mitt';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MittProvider>
            <StoreProvider store={store}>
                <RouterProvider router={routes} />
            </StoreProvider>
        </MittProvider>
    </React.StrictMode>
);

reportWebVitals();
