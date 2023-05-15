import App from '@/App';
import HomePage from '@views/HomePage';
import EditorPage from '@views/EditorPage';
import Preview from '@views/Preview';

const routes = [
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
                Component: EditorPage
            },
            {
                path: 'preview',
                Component: Preview
            }
        ]
    }
];

export default routes;
