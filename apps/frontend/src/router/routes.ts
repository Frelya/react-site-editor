import type { RouteObject } from 'react-router-dom';
import App from '@/App';
import HomePage from '@views/home/HomePage';
import EditorPage from '@views/editor/EditorPage';
import Editor from '@views/editor/Editor';
import Preview from '@views/editor/Preview';

const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'editor',
                Component: EditorPage,
                children: [
                    {
                        index: true,
                        Component: Editor
                    },
                    {
                        path: 'preview',
                        Component: Preview
                    }
                ]
            }
        ]
    }
];

export default routes;
