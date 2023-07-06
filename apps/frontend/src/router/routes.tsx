import type { RouteObject } from 'react-router-dom';
import App from '@/App';
import HomePage from '@views/home/HomePage';
import { Editor, EditorPage, Preview } from '@views/editor';

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
