import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PreviewIframe from '../components/Preview/PreviewIframe';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/preview',
        element: <PreviewIframe />
    }
]);

export { routes };
