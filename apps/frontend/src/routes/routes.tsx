import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@views/HomePage';
import EditorPage from '@views/EditorPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'editor',
                element: <EditorPage />
            }
        ]
    }
]);

export { routes };
