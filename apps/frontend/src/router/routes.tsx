import type { RouteObject } from 'react-router-dom';
import App from '@/App';
import HomePage from '@views/home/HomePage';
import EditorPage from '@views/editor/EditorPage';
import Editor from '@views/editor/Editor';
import Preview from '@views/editor/Preview';

const routes: RouteObject[] = [
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
                element: <EditorPage />,
                children: [
                    {
                        index: true,
                        element: <Editor />
                    },
                    {
                        path: 'preview',
                        element: <Preview />
                    }
                ]
            }
        ]
    }
];

export default routes;
