import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@views/HomePage/HomePage';
import EditorPage from '@views/EditorPage/EditorPage';
import Preview from '@views/Preview/Preview';

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
    },
    {
        path: '/preview',
        element: <Preview />
    }
]);

export { routes };
