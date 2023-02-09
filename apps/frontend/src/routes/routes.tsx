import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import Preview from '@views/Preview/Preview';


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/preview',
        element: <Preview />
    }
]);

export { routes };
